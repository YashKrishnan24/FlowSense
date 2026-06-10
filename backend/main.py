from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from routers import analysis

app = FastAPI(
    title="FlowSense AI Service",
    description="AI-powered UX intelligence microservice for FlowSense.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis.router)

class HealthCheckResponse(BaseModel):
    status: str

@app.get("/", response_model=HealthCheckResponse)
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
