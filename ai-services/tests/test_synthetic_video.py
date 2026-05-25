"""Tests for synthetic video generator.

License: MIT (project-authored code)
"""

import pytest
import numpy as np
from app.services.synthetic_video import SyntheticVideoGenerator, create_synthetic_frames


class TestSyntheticVideoGenerator:
    """Test synthetic video generator functionality."""
    
    def test_generator_initialization(self):
        """Test generator can be initialized."""
        generator = SyntheticVideoGenerator(
            width=640,
            height=480,
            fps=30,
            num_persons=3
        )
        
        assert generator.width == 640
        assert generator.height == 480
        assert generator.fps == 30
        assert generator.num_persons == 3
        assert len(generator.persons) == 3
    
    def test_generate_frame(self):
        """Test frame generation."""
        generator = SyntheticVideoGenerator(
            width=640,
            height=480,
            num_persons=2
        )
        
        frame = generator.generate_frame()
        
        assert isinstance(frame, np.ndarray)
        assert frame.shape == (480, 640, 3)
        assert frame.dtype == np.uint8
    
    def test_generate_multiple_frames(self):
        """Test multiple frame generation."""
        generator = SyntheticVideoGenerator(
            width=320,
            height=240,
            num_persons=1
        )
        
        frames = generator.generate_frames(5)
        
        assert len(frames) == 5
        for frame in frames:
            assert isinstance(frame, np.ndarray)
            assert frame.shape == (240, 320, 3)
    
    def test_person_movement(self):
        """Test that persons move between frames."""
        generator = SyntheticVideoGenerator(
            width=640,
            height=480,
            num_persons=1
        )
        
        # Get initial positions
        initial_x = generator.persons[0].x
        initial_y = generator.persons[0].y
        
        # Generate frame (updates positions)
        generator.generate_frame()
        
        # Positions should have changed
        assert generator.persons[0].x != initial_x or generator.persons[0].y != initial_y


class TestCreateSyntheticFrames:
    """Test synthetic frames creation function."""
    
    def test_create_synthetic_frames(self):
        """Test create_synthetic_frames function."""
        frames = create_synthetic_frames(
            num_frames=3,
            width=320,
            height=240,
            num_persons=2
        )
        
        assert len(frames) == 3
        for frame in frames:
            assert isinstance(frame, np.ndarray)
            assert frame.shape == (240, 320, 3)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])