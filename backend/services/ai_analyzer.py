import os
import json
from pydantic import BaseModel, Field
from typing import List, Optional
from urllib.request import urlopen

class Recommendation(BaseModel):
    severity: str = Field(description="Critical, Moderate, or Minor")
    impact: str = Field(description="High, Medium, or Low")
    category: str = Field(description="E.g., Typography, Contrast, Hierarchy, CTA")
    description: str = Field(description="Clear description of the issue")
    suggested_fix: str = Field(description="Actionable suggestion to fix the issue")
    marker_x: Optional[float] = Field(description="X coordinate (0.0 to 1.0) of the issue on the screenshot", default=None)
    marker_y: Optional[float] = Field(description="Y coordinate (0.0 to 1.0) of the issue on the screenshot", default=None)

class UXReport(BaseModel):
    overall_score: int = Field(description="Score from 0 to 100")
    accessibility_score: int = Field(description="Score from 0 to 100")
    visual_clarity_score: int = Field(description="Score from 0 to 100")
    conversion_score: int = Field(description="Score from 0 to 100")
    strengths: List[str] = Field(description="List of positive UX aspects")
    weaknesses: List[str] = Field(description="List of negative UX aspects")
    recommendations: List[Recommendation] = Field(description="Detailed actionable recommendations with X/Y coordinates")

class AIAnalyzer:
    def __init__(self):
        # We check for the API key here to avoid crashing the server on startup
        if not os.environ.get("GEMINI_API_KEY"):
            raise ValueError("GEMINI_API_KEY environment variable is missing. Please set it to enable AI analysis.")
            
        from google import genai
        self.client = genai.Client()
        self.model = "gemini-2.5-flash"

    def analyze_screenshot(self, image_url: str) -> UXReport:
        try:
            image_data = urlopen(image_url).read()
        except Exception as e:
            raise ValueError(f"Could not download image from URL: {str(e)}")
            
        from google.genai import types
        
        prompt = (
            "You are an expert UX/UI designer and accessibility auditor. "
            "Analyze this UI screenshot thoroughly. "
            "Provide scores (0-100) for overall UX, accessibility, visual clarity, and conversion readiness. "
            "List strengths and weaknesses. "
            "Provide detailed recommendations with severity, impact, category, description, and suggested fix. "
            "For each recommendation, estimate the X and Y coordinates (0.0 to 1.0, where 0,0 is top-left) of the issue on the screenshot."
        )

        response = self.client.models.generate_content(
            model=self.model,
            contents=[
                prompt,
                types.Part.from_bytes(data=image_data, mime_type='image/jpeg')
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=UXReport,
                temperature=0.2,
            )
        )
        
        return UXReport.model_validate_json(response.text)
