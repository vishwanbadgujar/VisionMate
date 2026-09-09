# VisionMate Backend

Express.js backend for VisionMate — AI accessibility companion for vision, OCR, and object identification.

## Setup

```bash
npm install
npm run dev
```

Server runs on port `3001` by default.

## Environment Variables

Create `.env` file:

```
# Server
PORT=3001
NODE_ENV=development
LOG_LEVEL=info

# CORS
CORS_ORIGIN=http://localhost:8443

# Vision Provider (mock, google, anthropic)
VISION_PROVIDER=mock

# Google Cloud Vision (if using google provider)
# GOOGLE_VISION_API_KEY=your_api_key
# GOOGLE_PROJECT_ID=your_project_id

# Anthropic Claude (if using anthropic provider)
# ANTHROPIC_API_KEY=your_api_key
```

## API Endpoints

### Vision API

#### POST `/api/vision/describe`
Describe a scene from an image.

**Request:**
```json
{
  "imageData": "base64_encoded_image",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "describe",
    "content": "Description of the scene...",
    "confidence": 0.95,
    "processingTimeMs": 1500
  }
}
```

#### POST `/api/vision/ocr`
Extract text from an image (OCR).

**Request:**
```json
{
  "imageData": "base64_encoded_image",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "ocr",
    "content": "Extracted text...",
    "confidence": 0.92,
    "processingTimeMs": 1200
  }
}
```

#### POST `/api/vision/identify`
Identify an object in an image.

**Request:**
```json
{
  "imageData": "base64_encoded_image"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "identify",
    "content": "Object name",
    "confidence": 0.91,
    "metadata": {
      "alternatives": ["Alternative 1", "Alternative 2"],
      "category": "Electronics"
    },
    "processingTimeMs": 1800
  }
}
```

#### GET `/api/vision/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-09-09T23:30:00.000Z",
  "services": {
    "vision": true,
    "database": true
  }
}
```

## Architecture

```
src/
├── index.ts              # Express app setup
├── config/               # Configuration
├── controllers/          # Request handlers
├── services/             # Business logic
├── routes/               # API routes
├── middleware/           # Express middleware
├── types/                # TypeScript types
└── utils/                # Utilities
```

## Integration with Vision APIs

### Google Cloud Vision
1. Create Google Cloud project
2. Enable Vision API
3. Create service account & download JSON key
4. Set `GOOGLE_VISION_API_KEY` env var
5. Set `VISION_PROVIDER=google`

### Anthropic Claude
1. Get API key from Anthropic console
2. Set `ANTHROPIC_API_KEY` env var
3. Set `VISION_PROVIDER=anthropic`

## Development

```bash
# Watch mode
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## Notes

- Currently uses mock responses for testing
- Actual API integration requires valid credentials
- Image data should be base64 encoded
- CORS is configured for web frontend
