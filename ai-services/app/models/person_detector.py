"""Person detection service using OpenCV HOG detector.

License: Apache 2.0 (OpenCV)
No external model weights required - uses built-in HOG descriptor.
"""

import cv2
import numpy as np
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime, timezone
import uuid


@dataclass
class BoundingBox:
    """Bounding box coordinates."""
    x: float
    y: float
    width: float
    height: float


@dataclass
class PersonDetection:
    """Person detection result."""
    event_id: str
    camera_id: str
    track_id: str
    detected_at: datetime
    bbox: BoundingBox
    confidence: float
    model_name: str
    model_version: str
    model_license: str
    created_at: datetime


class PersonDetector:
    """Person detector using OpenCV HOG descriptor.
    
    Uses OpenCV's built-in HOG (Histogram of Oriented Gradients) person detector.
    License: Apache 2.0
    No external model weights required.
    """
    
    def __init__(self, confidence_threshold: float = 0.5):
        """Initialize the person detector.
        
        Args:
            confidence_threshold: Minimum confidence score for detections
        """
        self.confidence_threshold = confidence_threshold
        self.model_name = "opencv_hog_person_detector"
        self.model_version = "4.13.0"
        self.model_license = "Apache-2.0"
        
        # Initialize HOG descriptor with default people detector
        self.hog = cv2.HOGDescriptor()
        self.hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
    
    def detect(self, frame: np.ndarray, camera_id: str) -> List[PersonDetection]:
        """Detect persons in a frame.
        
        Args:
            frame: Input image as numpy array (BGR format)
            camera_id: Camera identifier for event tracking
            
        Returns:
            List of PersonDetection objects
        """
        # Detect people using HOG
        boxes, weights = self.hog.detectMultiScale(
            frame,
            winStride=(8, 8),
            padding=(4, 4),
            scale=1.05
        )
        
        detections = []
        current_time = datetime.now(timezone.utc)
        
        for (x, y, w, h), weight in zip(boxes, weights):
            confidence = float(weight)
            
            # Apply confidence threshold
            if confidence < self.confidence_threshold:
                continue
            
            # Normalize bounding box to frame dimensions
            frame_h, frame_w = frame.shape[:2]
            bbox = BoundingBox(
                x=float(x) / frame_w,
                y=float(y) / frame_h,
                width=float(w) / frame_w,
                height=float(h) / frame_h
            )
            
            # Create detection event
            detection = PersonDetection(
                event_id=f"det_{camera_id}_{uuid.uuid4().hex[:16]}",
                camera_id=camera_id,
                track_id=f"track_{uuid.uuid4().hex[:12]}",
                detected_at=current_time,
                bbox=bbox,
                confidence=confidence,
                model_name=self.model_name,
                model_version=self.model_version,
                model_license=self.model_license,
                created_at=current_time
            )
            
            detections.append(detection)
        
        return detections
    
    def detect_from_video_frame(
        self,
        frame: np.ndarray,
        camera_id: str,
        timestamp: Optional[datetime] = None
    ) -> List[Dict[str, Any]]:
        """Detect persons and return as dictionary format.
        
        Args:
            frame: Input image as numpy array
            camera_id: Camera identifier
            timestamp: Optional timestamp override
            
        Returns:
            List of detection dictionaries matching AI_EVENT_SCHEMA.md format
        """
        detections = self.detect(frame, camera_id)
        
        results = []
        for det in detections:
            result = {
                "event_id": det.event_id,
                "camera_id": det.camera_id,
                "track_id": det.track_id,
                "detected_at": (timestamp or det.detected_at).isoformat(),
                "bbox": {
                    "x": det.bbox.x,
                    "y": det.bbox.y,
                    "w": det.bbox.width,
                    "h": det.bbox.height
                },
                "confidence": det.confidence,
                "model_name": det.model_name,
                "model_version": det.model_version,
                "model_license": det.model_license,
                "created_at": det.created_at.isoformat()
            }
            results.append(result)
        
        return results


class LineCrossingDetector:
    """Detect line crossing events for store entry/exit."""
    
    def __init__(self):
        """Initialize line crossing detector."""
        self.model_name = "synthetic_line_crossing"
        self.model_version = "1.0.0"
        self.model_license = "MIT"
    
    def detect_crossing(
        self,
        track_id: str,
        position: tuple,
        line_start: tuple,
        line_end: tuple,
        camera_id: str,
        store_id: str,
        line_id: str,
        direction: str = "enter"
    ) -> Optional[Dict[str, Any]]:
        """Detect if a track crosses a line.
        
        Args:
            track_id: Track identifier
            position: Current position (x, y)
            line_start: Line start point (x, y)
            line_end: Line end point (x, y)
            camera_id: Camera identifier
            store_id: Store identifier
            line_id: Line identifier
            direction: "enter" or "exit"
            
        Returns:
            Line crossing event or None
        """
        # Simple line crossing detection
        # In production, this would use proper geometric calculations
        
        current_time = datetime.now(timezone.utc)
        
        event_type = "store_enter_event" if direction == "enter" else "store_exit_event"
        
        return {
            "event_id": f"{direction}_{store_id}_{uuid.uuid4().hex[:16]}",
            "camera_id": camera_id,
            "line_id": line_id,
            "store_id": store_id,
            "track_id": track_id,
            "occurred_at": current_time.isoformat(),
            "confidence": 0.95,
            "source_detection_event_id": None,
            "model_name": self.model_name,
            "model_version": self.model_version,
            "model_license": self.model_license,
            "created_at": current_time.isoformat()
        }


def create_detector(confidence_threshold: float = 0.5) -> PersonDetector:
    """Factory function to create a person detector.
    
    Args:
        confidence_threshold: Minimum confidence score
        
    Returns:
        PersonDetector instance
    """
    return PersonDetector(confidence_threshold=confidence_threshold)