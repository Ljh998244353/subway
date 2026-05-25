"""AI Services API routes.

License: MIT (project-authored code)
FastAPI routes for AI video processing services.
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from pydantic import BaseModel, Field
import uuid


router = APIRouter(prefix="/api/v1/ai", tags=["AI Services"])


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "ok"
    service: str = "mall-vision-ai-services"
    version: str = "0.1.0"
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class DetectionRequest(BaseModel):
    """Detection request parameters."""
    camera_id: str = Field(..., description="Camera identifier")
    confidence_threshold: float = Field(0.5, ge=0.0, le=1.0, description="Confidence threshold")


class PersonDetectionResponse(BaseModel):
    """Person detection response."""
    event_id: str
    camera_id: str
    track_id: str
    detected_at: str
    bbox: Dict[str, float]
    confidence: float
    model_name: str
    model_version: str
    model_license: str
    created_at: str


class EventValidationResponse(BaseModel):
    """Event validation response."""
    total: int
    valid: int
    invalid: int
    errors: List[str]


@router.get("/health")
async def health_check() -> HealthResponse:
    """Health check endpoint."""
    return HealthResponse()


@router.post("/detect/persons")
async def detect_persons(
    file: UploadFile = File(...),
    camera_id: str = "cam_default",
    confidence_threshold: float = 0.5
) -> List[PersonDetectionResponse]:
    """Detect persons in uploaded image.
    
    Args:
        file: Image file
        camera_id: Camera identifier
        confidence_threshold: Detection confidence threshold
        
    Returns:
        List of person detections
    """
    # Read image file
    contents = await file.read()
    
    # Import here to avoid circular imports
    from app.models.person_detector import PersonDetector
    import numpy as np
    import cv2
    
    # Convert to numpy array
    nparr = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if frame is None:
        raise HTTPException(status_code=400, detail="Invalid image file")
    
    # Detect persons
    detector = PersonDetector(confidence_threshold=confidence_threshold)
    detections = detector.detect_from_video_frame(frame, camera_id)
    
    return [PersonDetectionResponse(**d) for d in detections]


@router.post("/events/validate")
async def validate_events(events: List[Dict[str, Any]]) -> EventValidationResponse:
    """Validate events against AI event schema.
    
    Args:
        events: List of event dictionaries
        
    Returns:
        Validation results
    """
    from app.services.event_processor import EventProcessor
    
    processor = EventProcessor()
    results = processor.batch_validate(events)
    
    return EventValidationResponse(**results)


@router.get("/fixtures/synthetic-video")
async def generate_synthetic_video(
    duration: float = 5.0,
    width: int = 640,
    height: int = 480,
    num_persons: int = 3
) -> Dict[str, Any]:
    """Generate synthetic video fixture information.
    
    Args:
        duration: Video duration in seconds
        width: Video width
        height: Video height
        num_persons: Number of synthetic persons
        
    Returns:
        Synthetic video information
    """
    from app.services.synthetic_video import SyntheticVideoGenerator
    
    generator = SyntheticVideoGenerator(
        width=width,
        height=height,
        num_persons=num_persons
    )
    
    return {
        "status": "ready",
        "duration_seconds": duration,
        "width": width,
        "height": height,
        "num_persons": num_persons,
        "fps": generator.fps,
        "model_license": "MIT",
        "description": "Synthetic video with geometric shapes simulating persons"
    }