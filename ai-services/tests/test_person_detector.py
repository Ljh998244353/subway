"""Tests for person detector.

License: MIT (project-authored code)
"""

import pytest
import numpy as np
from app.models.person_detector import PersonDetector, BoundingBox


class TestPersonDetector:
    """Test person detector functionality."""
    
    def test_detector_initialization(self):
        """Test detector can be initialized."""
        detector = PersonDetector(confidence_threshold=0.5)
        assert detector.model_name == "opencv_hog_person_detector"
        assert detector.model_version == "4.13.0"
        assert detector.model_license == "Apache-2.0"
    
    def test_detector_with_custom_threshold(self):
        """Test detector with custom confidence threshold."""
        detector = PersonDetector(confidence_threshold=0.7)
        assert detector.confidence_threshold == 0.7
    
    def test_detect_empty_frame(self):
        """Test detection on empty frame."""
        detector = PersonDetector(confidence_threshold=0.5)
        
        # Create empty frame (no persons)
        frame = np.zeros((480, 640, 3), dtype=np.uint8)
        
        detections = detector.detect(frame, "cam_test")
        assert isinstance(detections, list)
    
    def test_detect_returns_list(self):
        """Test that detect returns a list."""
        detector = PersonDetector()
        frame = np.zeros((480, 640, 3), dtype=np.uint8)
        
        result = detector.detect(frame, "cam_test")
        assert isinstance(result, list)
    
    def test_detect_from_video_frame(self):
        """Test detect_from_video_frame method."""
        detector = PersonDetector()
        frame = np.zeros((480, 640, 3), dtype=np.uint8)
        
        results = detector.detect_from_video_frame(frame, "cam_test")
        assert isinstance(results, list)
    
    def test_detection_event_format(self):
        """Test detection event format matches schema."""
        detector = PersonDetector()
        frame = np.zeros((480, 640, 3), dtype=np.uint8)
        
        results = detector.detect_from_video_frame(frame, "cam_test")
        
        # Check format if any detections
        for result in results:
            assert "event_id" in result
            assert "camera_id" in result
            assert "track_id" in result
            assert "detected_at" in result
            assert "bbox" in result
            assert "confidence" in result
            assert "model_name" in result
            assert "model_version" in result
            assert "model_license" in result
            assert "created_at" in result
            
            # Check bbox format
            bbox = result["bbox"]
            assert "x" in bbox
            assert "y" in bbox
            assert "w" in bbox
            assert "h" in bbox
            
            # Check confidence bounds
            assert 0 <= result["confidence"] <= 1


class TestBoundingBox:
    """Test BoundingBox dataclass."""
    
    def test_bbox_creation(self):
        """Test bounding box creation."""
        bbox = BoundingBox(x=0.1, y=0.2, width=0.3, height=0.4)
        assert bbox.x == 0.1
        assert bbox.y == 0.2
        assert bbox.width == 0.3
        assert bbox.height == 0.4


if __name__ == "__main__":
    pytest.main([__file__, "-v"])