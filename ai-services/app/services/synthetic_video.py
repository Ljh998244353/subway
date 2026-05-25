"""Synthetic video fixture generator for testing.

License: MIT (project-authored code)
Generates synthetic video with geometric shapes simulating persons.
No real video, monitoring footage, or personal data.
"""

import cv2
import numpy as np
from typing import List, Tuple, Optional
from dataclasses import dataclass
from pathlib import Path
import random
import math


@dataclass
class SyntheticPerson:
    """Synthetic person representation with geometric shape."""
    x: float
    y: float
    width: float
    height: float
    velocity_x: float
    velocity_y: float
    color: Tuple[int, int, int]
    track_id: str


class SyntheticVideoGenerator:
    """Generate synthetic video with geometric shapes simulating persons.
    
    License: MIT (project-authored)
    No real video or personal data used.
    """
    
    def __init__(
        self,
        width: int = 640,
        height: int = 480,
        fps: int = 30,
        num_persons: int = 3
    ):
        """Initialize synthetic video generator.
        
        Args:
            width: Video width in pixels
            height: Video height in pixels
            fps: Frames per second
            num_persons: Number of synthetic persons to generate
        """
        self.width = width
        self.height = height
        self.fps = fps
        self.num_persons = num_persons
        self.persons: List[SyntheticPerson] = []
        
        self._initialize_persons()
    
    def _initialize_persons(self):
        """Initialize synthetic persons with random positions and velocities."""
        colors = [
            (0, 255, 0),    # Green
            (255, 0, 0),    # Blue
            (0, 0, 255),    # Red
            (255, 255, 0),  # Cyan
            (255, 0, 255),  # Magenta
        ]
        
        for i in range(self.num_persons):
            person = SyntheticPerson(
                x=random.uniform(50, self.width - 50),
                y=random.uniform(50, self.height - 50),
                width=random.uniform(30, 50),
                height=random.uniform(60, 100),
                velocity_x=random.uniform(-2, 2),
                velocity_y=random.uniform(-1, 1),
                color=colors[i % len(colors)],
                track_id=f"synth_track_{i:03d}"
            )
            self.persons.append(person)
    
    def _update_persons(self):
        """Update person positions with boundary checking."""
        for person in self.persons:
            # Update position
            person.x += person.velocity_x
            person.y += person.velocity_y
            
            # Bounce off boundaries
            if person.x < 0 or person.x > self.width - person.width:
                person.velocity_x *= -1
                person.x = max(0, min(person.x, self.width - person.width))
            
            if person.y < 0 or person.y > self.height - person.height:
                person.velocity_y *= -1
                person.y = max(0, min(person.y, self.height - person.height))
    
    def generate_frame(self) -> np.ndarray:
        """Generate a single synthetic video frame.
        
        Returns:
            Frame as numpy array (BGR format)
        """
        # Create blank frame with gray background
        frame = np.ones((self.height, self.width, 3), dtype=np.uint8) * 128
        
        # Draw floor grid lines for context
        for x in range(0, self.width, 50):
            cv2.line(frame, (x, 0), (x, self.height), (100, 100, 100), 1)
        for y in range(0, self.height, 50):
            cv2.line(frame, (0, y), (self.width, y), (100, 100, 100), 1)
        
        # Draw synthetic persons as rectangles
        for person in self.persons:
            x1 = int(person.x)
            y1 = int(person.y)
            x2 = int(person.x + person.width)
            y2 = int(person.y + person.height)
            
            # Draw person rectangle
            cv2.rectangle(frame, (x1, y1), (x2, y2), person.color, 2)
            
            # Draw head circle
            head_x = int(person.x + person.width / 2)
            head_y = int(person.y - 10)
            cv2.circle(frame, (head_x, head_y), 10, person.color, -1)
        
        # Update positions for next frame
        self._update_persons()
        
        return frame
    
    def generate_video(
        self,
        output_path: str,
        duration_seconds: float = 5.0
    ) -> str:
        """Generate synthetic video file.
        
        Args:
            output_path: Path to save video file
            duration_seconds: Video duration in seconds
            
        Returns:
            Path to generated video file
        """
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, self.fps, (self.width, self.height))
        
        num_frames = int(self.fps * duration_seconds)
        
        for _ in range(num_frames):
            frame = self.generate_frame()
            out.write(frame)
        
        out.release()
        return output_path
    
    def generate_frames(self, num_frames: int) -> List[np.ndarray]:
        """Generate multiple synthetic frames.
        
        Args:
            num_frames: Number of frames to generate
            
        Returns:
            List of frames as numpy arrays
        """
        frames = []
        for _ in range(num_frames):
            frame = self.generate_frame()
            frames.append(frame)
        return frames


def create_synthetic_video(
    output_dir: str,
    filename: str = "synthetic_test.mp4",
    duration: float = 5.0,
    width: int = 640,
    height: int = 480,
    num_persons: int = 3
) -> str:
    """Create a synthetic video fixture.
    
    Args:
        output_dir: Output directory
        filename: Output filename
        duration: Video duration in seconds
        width: Video width
        height: Video height
        num_persons: Number of synthetic persons
        
    Returns:
        Path to generated video
    """
    output_path = str(Path(output_dir) / filename)
    
    generator = SyntheticVideoGenerator(
        width=width,
        height=height,
        num_persons=num_persons
    )
    
    return generator.generate_video(output_path, duration)


def create_synthetic_frames(
    num_frames: int = 30,
    width: int = 640,
    height: int = 480,
    num_persons: int = 3
) -> List[np.ndarray]:
    """Create synthetic video frames.
    
    Args:
        num_frames: Number of frames
        width: Frame width
        height: Frame height
        num_persons: Number of synthetic persons
        
    Returns:
        List of frames
    """
    generator = SyntheticVideoGenerator(
        width=width,
        height=height,
        num_persons=num_persons
    )
    
    return generator.generate_frames(num_frames)