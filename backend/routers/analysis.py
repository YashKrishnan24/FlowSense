from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.ai_analyzer import AIAnalyzer, UXReport
import logging

router = APIRouter(prefix="/api/analysis", tags=["Analysis"])

class AnalysisRequest(BaseModel):
    image_url: str

@router.post("/", response_model=UXReport)
async def analyze_screenshot(request: AnalysisRequest):
    try:
        logging.info(f"Starting synchronous analysis for {request.image_url}")
        
        # Instantiate inside the endpoint to prevent startup crashes if API key is missing
        analyzer = AIAnalyzer() 
        report = analyzer.analyze_screenshot(request.image_url)
        
        return report
    except ValueError as ve:
        logging.error(f"Configuration Error: {str(ve)}")
        raise HTTPException(status_code=500, detail=str(ve))
    except Exception as e:
        logging.error(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process image through AI.")
