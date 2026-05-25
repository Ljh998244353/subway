# AI Services

AI video processing services for the Mall Vision system.

## Overview

This module provides AI-powered video analysis capabilities for mall operations, including:
- Person detection using OpenCV HOG detector (Apache 2.0 license)
- Synthetic video fixture generation for testing
- Event processing and schema validation

## License

All code in this module is project-authored under MIT license.

Dependencies:
- OpenCV: Apache 2.0 License
- FastAPI: MIT License
- NumPy: BSD License
- Other dependencies: See `requirements.txt`

## Setup

1. Create virtual environment:
```bash
python -m venv .venv
```

2. Activate virtual environment:
```bash
# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running

Start the AI services server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API documentation available at: http://localhost:8000/docs

## Testing

Run tests:
```bash
pytest tests/ -v
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/v1/ai/health` - AI services health check
- `POST /api/v1/ai/detect/persons` - Detect persons in image
- `POST /api/v1/ai/events/validate` - Validate events against schema
- `GET /api/v1/ai/fixtures/synthetic-video` - Get synthetic video info

## Privacy And Compliance

- No real video or monitoring footage used
- No face images stored
- No personal trajectories exposed
- No personal identifiers collected
- All synthetic data for testing only

## Model Information

- Model: OpenCV HOG Person Detector
- Version: 4.13.0
- License: Apache 2.0
- Type: Built-in descriptor (no external weights required)