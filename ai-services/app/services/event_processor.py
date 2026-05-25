"""Event processing service for AI detections.

License: MIT (project-authored code)
Converts detection results to AI event schema format.
"""

from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from dataclasses import dataclass, asdict
import uuid
import json


@dataclass
class AIEvent:
    """Base AI event structure matching AI_EVENT_SCHEMA.md."""
    event_id: str
    source_event_id: Optional[str]
    confidence: float
    model_name: str
    model_version: str
    model_license: str
    created_at: str


@dataclass
class PersonDetectionEvent(AIEvent):
    """Person detection event."""
    camera_id: str
    track_id: str
    detected_at: str
    bbox: Dict[str, float]


@dataclass
class StoreEntryEvent(AIEvent):
    """Store entry event."""
    camera_id: str
    line_id: str
    store_id: str
    track_id: str
    occurred_at: str


@dataclass
class StoreExitEvent(AIEvent):
    """Store exit event."""
    camera_id: str
    line_id: str
    store_id: str
    track_id: str
    occurred_at: str


class EventProcessor:
    """Process AI detections into schema-compliant events."""
    
    def __init__(self):
        """Initialize event processor."""
        pass
    
    def create_person_detection_event(
        self,
        detection: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Create person detection event from detection result.
        
        Args:
            detection: Detection result dictionary
            
        Returns:
            Event matching AI_EVENT_SCHEMA.md format
        """
        return {
            "event_id": detection.get("event_id", f"det_{uuid.uuid4().hex[:16]}"),
            "camera_id": detection.get("camera_id", "cam_unknown"),
            "track_id": detection.get("track_id", f"track_{uuid.uuid4().hex[:12]}"),
            "detected_at": detection.get("detected_at", datetime.now(timezone.utc).isoformat()),
            "bbox": detection.get("bbox", {"x": 0, "y": 0, "w": 0, "h": 0}),
            "confidence": detection.get("confidence", 0.0),
            "model_name": detection.get("model_name", "unknown"),
            "model_version": detection.get("model_version", "unknown"),
            "model_license": detection.get("model_license", "unknown"),
            "created_at": detection.get("created_at", datetime.now(timezone.utc).isoformat())
        }
    
    def create_store_entry_event(
        self,
        camera_id: str,
        line_id: str,
        store_id: str,
        track_id: str,
        confidence: float = 0.95,
        model_name: str = "synthetic_line_crossing",
        model_version: str = "1.0.0",
        model_license: str = "MIT"
    ) -> Dict[str, Any]:
        """Create store entry event.
        
        Args:
            camera_id: Camera identifier
            line_id: Line identifier
            store_id: Store identifier
            track_id: Track identifier
            confidence: Detection confidence
            model_name: Model name
            model_version: Model version
            model_license: Model license
            
        Returns:
            Store entry event dictionary
        """
        current_time = datetime.now(timezone.utc)
        
        return {
            "event_id": f"enter_{store_id}_{uuid.uuid4().hex[:16]}",
            "camera_id": camera_id,
            "line_id": line_id,
            "store_id": store_id,
            "track_id": track_id,
            "occurred_at": current_time.isoformat(),
            "confidence": confidence,
            "source_event_id": None,
            "model_name": model_name,
            "model_version": model_version,
            "model_license": model_license,
            "created_at": current_time.isoformat()
        }
    
    def create_store_exit_event(
        self,
        camera_id: str,
        line_id: str,
        store_id: str,
        track_id: str,
        confidence: float = 0.95,
        model_name: str = "synthetic_line_crossing",
        model_version: str = "1.0.0",
        model_license: str = "MIT"
    ) -> Dict[str, Any]:
        """Create store exit event.
        
        Args:
            camera_id: Camera identifier
            line_id: Line identifier
            store_id: Store identifier
            track_id: Track identifier
            confidence: Detection confidence
            model_name: Model name
            model_version: Model version
            model_license: Model license
            
        Returns:
            Store exit event dictionary
        """
        current_time = datetime.now(timezone.utc)
        
        return {
            "event_id": f"exit_{store_id}_{uuid.uuid4().hex[:16]}",
            "camera_id": camera_id,
            "line_id": line_id,
            "store_id": store_id,
            "track_id": track_id,
            "occurred_at": current_time.isoformat(),
            "confidence": confidence,
            "source_event_id": None,
            "model_name": model_name,
            "model_version": model_version,
            "model_license": model_license,
            "created_at": current_time.isoformat()
        }
    
    def validate_event(self, event: Dict[str, Any]) -> bool:
        """Validate event against AI_EVENT_SCHEMA.md requirements.
        
        Args:
            event: Event dictionary to validate
            
        Returns:
            True if valid, False otherwise
        """
        required_fields = ["event_id", "confidence", "model_name", "model_version", "model_license", "created_at"]
        
        for field in required_fields:
            if field not in event:
                return False
        
        # Validate confidence bounds
        confidence = event.get("confidence", 0)
        if not (0 <= confidence <= 1):
            return False
        
        # Validate datetime format
        try:
            datetime.fromisoformat(event["created_at"].replace("Z", "+00:00"))
        except (ValueError, AttributeError):
            return False
        
        return True
    
    def batch_validate(self, events: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Validate a batch of events.
        
        Args:
            events: List of event dictionaries
            
        Returns:
            Validation results
        """
        results = {
            "total": len(events),
            "valid": 0,
            "invalid": 0,
            "errors": []
        }
        
        for i, event in enumerate(events):
            if self.validate_event(event):
                results["valid"] += 1
            else:
                results["invalid"] += 1
                results["errors"].append(f"Event {i}: invalid format")
        
        return results


def create_event_processor() -> EventProcessor:
    """Factory function to create event processor.
    
    Returns:
        EventProcessor instance
    """
    return EventProcessor()