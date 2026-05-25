"""Tests for event processor.

License: MIT (project-authored code)
"""

import pytest
from datetime import datetime, timezone
from app.services.event_processor import EventProcessor


class TestEventProcessor:
    """Test event processor functionality."""
    
    def test_processor_initialization(self):
        """Test processor can be initialized."""
        processor = EventProcessor()
        assert processor is not None
    
    def test_create_person_detection_event(self):
        """Test person detection event creation."""
        processor = EventProcessor()
        
        detection = {
            "event_id": "det_cam01_001",
            "camera_id": "cam01",
            "track_id": "track_001",
            "detected_at": "2026-05-25T10:00:00Z",
            "bbox": {"x": 0.1, "y": 0.2, "w": 0.3, "h": 0.4},
            "confidence": 0.95,
            "model_name": "opencv_hog",
            "model_version": "4.13.0",
            "model_license": "Apache-2.0",
            "created_at": "2026-05-25T10:00:00Z"
        }
        
        event = processor.create_person_detection_event(detection)
        
        assert event["event_id"] == "det_cam01_001"
        assert event["camera_id"] == "cam01"
        assert event["track_id"] == "track_001"
        assert event["confidence"] == 0.95
    
    def test_create_store_entry_event(self):
        """Test store entry event creation."""
        processor = EventProcessor()
        
        event = processor.create_store_entry_event(
            camera_id="cam01",
            line_id="line01",
            store_id="store001",
            track_id="track_001"
        )
        
        assert "enter_store001_" in event["event_id"]
        assert event["camera_id"] == "cam01"
        assert event["line_id"] == "line01"
        assert event["store_id"] == "store001"
        assert event["track_id"] == "track_001"
        assert event["confidence"] == 0.95
    
    def test_create_store_exit_event(self):
        """Test store exit event creation."""
        processor = EventProcessor()
        
        event = processor.create_store_exit_event(
            camera_id="cam01",
            line_id="line01",
            store_id="store001",
            track_id="track_001"
        )
        
        assert "exit_store001_" in event["event_id"]
        assert event["camera_id"] == "cam01"
        assert event["line_id"] == "line01"
        assert event["store_id"] == "store001"
        assert event["track_id"] == "track_001"
    
    def test_validate_valid_event(self):
        """Test validation of valid event."""
        processor = EventProcessor()
        
        event = {
            "event_id": "test_001",
            "confidence": 0.95,
            "model_name": "test_model",
            "model_version": "1.0.0",
            "model_license": "MIT",
            "created_at": "2026-05-25T10:00:00Z"
        }
        
        assert processor.validate_event(event) is True
    
    def test_validate_invalid_event_missing_field(self):
        """Test validation of event with missing field."""
        processor = EventProcessor()
        
        event = {
            "event_id": "test_001",
            "confidence": 0.95,
            # Missing required fields
        }
        
        assert processor.validate_event(event) is False
    
    def test_validate_invalid_confidence(self):
        """Test validation of event with invalid confidence."""
        processor = EventProcessor()
        
        event = {
            "event_id": "test_001",
            "confidence": 1.5,  # Invalid: > 1
            "model_name": "test_model",
            "model_version": "1.0.0",
            "model_license": "MIT",
            "created_at": "2026-05-25T10:00:00Z"
        }
        
        assert processor.validate_event(event) is False
    
    def test_batch_validate(self):
        """Test batch validation."""
        processor = EventProcessor()
        
        events = [
            {
                "event_id": "test_001",
                "confidence": 0.95,
                "model_name": "test_model",
                "model_version": "1.0.0",
                "model_license": "MIT",
                "created_at": "2026-05-25T10:00:00Z"
            },
            {
                "event_id": "test_002",
                "confidence": 0.5,
                "model_name": "test_model",
                "model_version": "1.0.0",
                "model_license": "MIT",
                "created_at": "2026-05-25T10:00:00Z"
            }
        ]
        
        results = processor.batch_validate(events)
        
        assert results["total"] == 2
        assert results["valid"] == 2
        assert results["invalid"] == 0


if __name__ == "__main__":
    pytest.main([__file__, "-v"])