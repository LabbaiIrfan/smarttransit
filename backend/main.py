from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import datetime

app = FastAPI(title="Smart City Transport API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class PredictionRequest(BaseModel):
    route: str
    date: str
    time: str
    weather: str = "clear"
    holiday: bool = False

class FeedbackRequest(BaseModel):
    user_id: str
    route: str
    predicted_level: str
    actual_level: str
    accuracy_rating: int
    comments: Optional[str] = None

# Routes
@app.get("/")
def root():
    return {"message": "Smart City Transport API"}

@app.get("/api/health")
def health():
    return {"status": "healthy", "timestamp": datetime.datetime.now().isoformat()}

@app.post("/api/predict")
def predict(prediction: PredictionRequest):
    # ML prediction logic here
    hour = int(prediction.time.split(":")[0])
    
    if (7 <= hour <= 9) or (17 <= hour <= 19):
        level = "high"
        confidence = 85
    elif hour >= 22 or hour <= 5:
        level = "low"
        confidence = 90
    else:
        level = "medium"
        confidence = 75
    
    return {
        "level": level,
        "confidence": confidence,
        "estimated_crowd": "45-60 people",
        "recommendations": [
            "Consider alternative routes",
            "Travel during off-peak hours"
        ]
    }

@app.post("/api/feedback")
def submit_feedback(feedback: FeedbackRequest):
    # Store feedback logic
    return {"success": True, "message": "Feedback submitted"}