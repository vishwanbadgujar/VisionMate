# VisionMate — AI Accessibility Companion

A professional, accessibility-first mobile application that uses AI vision, OCR, and voice features to help users understand the world around them.

## 🎯 Project Overview

VisionMate is a **tripartite architecture** consisting of:

1. **Web Prototype** (Figma/React/Vite) — UI/UX reference and web preview
2. **Mobile App** (React Native) — Production mobile application with real camera and sensors
3. **Backend Service** (Node.js/Express) — Secure API for vision processing

## 📁 Repository Structure

```
VisionMate/
├── VisionMate/                    # Web prototype (current)
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── screens/               # Full-page screens
│   │   ├── services/              # Business logic
│   │   ├── theme/                 # Design tokens
│   │   ├── types/                 # TypeScript types
│   │   ├── App.tsx                # Router setup
│   │   └── main.tsx
│   ├── package.json
│   └── README.md
│
├── VisionMate-Mobile/             # React Native mobile app
│   ├── src/
│   │   ├── screens/               # Mobile screens
│   │   ├── components/            # React Native components
│   │   ├── services/              # Services (camera, TTS, permissions)
│   │   ├── store/                 # Zustand state management
│   │   ├── types/                 # Shared types
│   │   ├── theme/                 # Design system
│   │   └── App.tsx
│   ├── android/                   # Android native code
│   ├── ios/                       # iOS native code
│   └── package.json
│
└── VisionMate-Backend/            # Backend service
    ├── src/
    │   ├── index.ts               # Express server
    │   ├── config/                # Configuration
    │   ├── routes/                # API routes
    │   ├── controllers/           # Request handlers
    │   ├── services/              # Vision API integration
    │   ├── middleware/            # Express middleware
    │   └── types/                 # Shared types
    ├── .env.example               # Environment template
    └── package.json
```

## 🚀 Getting Started

### Web Prototype

```bash
cd VisionMate
npm install
npm run dev
# Open http://localhost:8443
```

**Flow**: Welcome → Permissions → Home (camera, modes) → History/Settings

### Mobile App (React Native)

```bash
cd VisionMate-Mobile
npm install

# iOS
npm run ios

# Android
npm run android
```

### Backend Service

```bash
cd VisionMate-Backend
npm install
cp .env.example .env
npm run dev
# Server runs on http://localhost:3001
```

## 🏗️ Architecture

### Data Flow

```
Mobile App (React Native)
    ↓
    ├→ Camera capture via react-native-vision-camera
    ├→ OCR via ML Kit (on-device)
    ├→ TTS via native speech synthesis
    └→ Voice recognition
    
    ↓ (Vision Processing)
    
Backend Service (Node.js/Express)
    ↓
    ├→ Google Cloud Vision API
    ├→ Anthropic Claude (multimodal)
    └→ Error handling & rate limiting
    
    ↓ (Response)
    
Mobile App (Display & TTS)
    ↓
    ├→ Local history storage (react-native-fs)
    ├→ Display results
    └→ Play audio response
```

### Permissions Model

```
Mobile (React Native)
├── Camera permission (required)
├── Microphone permission (required)
└── Photo library access (optional)

Web (Browser)
├── Camera access (simulated)
└── Microphone access (Web Speech API)
```

### State Management

**Mobile**: Zustand store (`src/store/appStore.ts`)
- Onboarding state
- Permission grants
- Settings (TTS speed, voice commands, etc.)
- History
- Network status

**Web**: React Router + URL state
- Current screen
- Result cache

## 📱 Core Features

### 1. Scene Description
- **Input**: Camera image
- **Processing**: Multimodal vision model
- **Output**: Natural language description
- **Audio**: Text-to-speech playback

### 2. Text Recognition (OCR)
- **Input**: Camera image
- **Processing**: ML Kit (mobile) or Cloud Vision (backend)
- **Output**: Extracted text
- **Audio**: Read aloud with speed control

### 3. Object Identification
- **Input**: Camera image
- **Processing**: Multimodal vision model
- **Output**: Object name + confidence + alternatives
- **Audio**: Speak result with description

### 4. Continuous Mode
- **Frequency**: User-configurable interval (2–30s)
- **Processing**: Throttled vision updates
- **States**: Active, Paused, Stopped
- **Safeguards**: Avoid duplicate narration, battery optimization

### 5. Voice Commands
- Support: "Describe", "Read", "What's around me?", "What am I holding?"
- Integration: Native speech recognition
- Processing: Intent parser → Action trigger

### 6. History
- **Storage**: Local (encrypted optional)
- **Metadata**: Type, timestamp, content, tags
- **Features**: Search, replay, delete, export

### 7. Accessibility
- **Screen Reader**: Full support via accessibility labels
- **High Contrast**: Optional mode
- **Large Controls**: ≥48px tap targets
- **Haptic Feedback**: On capture, recognition
- **Voice First**: Default audio output

## 🔐 Security & Privacy

### No Cloud Image Storage
- Images are captured locally
- Sent to backend only for processing
- Never persisted unless user opts in

### Backend API Security
- Environment variables for credentials (never in code)
- No API keys exposed to mobile client
- CORS restricted to approved origins
- Rate limiting to prevent abuse

### Data Handling
- User can control data retention
- History stored locally by default
- Optional cloud backup (future feature)

## 🔧 Configuration

### Web Prototype

No config needed for mock responses. For real vision API:

```javascript
// In src/services/visionService.ts
const BACKEND_URL = "http://your-backend.com/api";
```

### Mobile App

```bash
# .env.local (Git-ignored)
EXPO_PUBLIC_BACKEND_URL=http://your-backend.com/api
EXPO_PUBLIC_VISION_API_KEY=your_key  # For direct API calls (not recommended)
```

### Backend Service

```bash
# .env (Git-ignored)
PORT=3001
VISION_PROVIDER=anthropic  # or google, mock
ANTHROPIC_API_KEY=sk-...
GOOGLE_VISION_API_KEY=...
CORS_ORIGIN=https://yourapp.com
```

## 📊 Testing Checklist

### Web Prototype
- [ ] Navigation: Welcome → Permissions → Home → History → Settings
- [ ] Mode selector: Scene, Text, Object
- [ ] Mock responses appear correctly
- [ ] History persistence works
- [ ] No console errors

### Mobile App
- [ ] Build succeeds for iOS and Android
- [ ] Permissions flow works
- [ ] Camera preview displays
- [ ] TTS speaks correctly
- [ ] History saves locally
- [ ] Settings persist
- [ ] No crashes on device

### Backend Service
- [ ] Server starts without errors
- [ ] Health endpoint responds
- [ ] Vision endpoints accept requests
- [ ] Error handling works (invalid input, timeouts)
- [ ] CORS allows mobile client

## 🚀 Deployment

### Web Prototype
```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or any static host
```

### Mobile App
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

### Backend
```bash
npm run build
# Deploy to Heroku, Railway, AWS, Google Cloud, etc.
```

## 📚 Technology Stack

| Layer | Tech | Version |
|-------|------|---------|
| **Web** | React, Vite, Tailwind CSS | 19, 8, 4 |
| **Mobile** | React Native, Expo | 0.73, 50 |
| **Backend** | Node.js, Express, TypeScript | 20, 4.18, 5.3 |
| **State** | Zustand | 4.4 |
| **Navigation** | React Navigation | 6.1 (mobile) |
| **Camera** | react-native-vision-camera | 2.16 |
| **TTS** | expo-speech, native APIs | 12 |
| **Permissions** | react-native-permissions | 4.1 |
| **OCR** | ML Kit, Cloud Vision | — |

## 🐛 Known Limitations & Future Work

### Current
- ✅ Mock vision responses
- ✅ Browser camera simulation (web only)
- ✅ Web Speech API (unreliable, web only)

### Tier 1 (Priority)
- Real camera access (mobile)
- Real vision API integration
- Native TTS
- On-device OCR (ML Kit)
- Local history persistence

### Tier 2 (Important)
- Voice command intent parsing
- Continuous mode with throttling
- Settings persistence
- Offline fallback

### Tier 3 (Stretch)
- Currency recognition
- Hazard detection (basic)
- Offline mode with downloaded models
- Cloud sync (optional)

## 📖 Documentation

- [Web Prototype README](./VisionMate/README.md)
- [Mobile App README](./VisionMate-Mobile/README.md)
- [Backend README](./VisionMate-Backend/README.md)
- [Figma Design](./VisionMate/.figma/)

## ✅ Compliance & Standards

- **WCAG 2.1 AA** accessibility guidelines
- **Privacy**: No third-party analytics by default
- **Permissions**: Clear permission flow with reasons
- **Error States**: User-friendly error messages

## 👥 Contributing

1. Follow the folder structure
2. Use TypeScript with strict mode
3. Write types for new features
4. Test on real device (mobile)
5. Document breaking changes

## 📝 License

Proprietary — VisionMate

---

**Last Updated**: September 9, 2026

For questions or issues, refer to individual package READMEs.
