Design a professional, accessibility-first mobile app UI for VisionMate — an AI accessibility companion that uses the camera to describe scenes, read text aloud (OCR), and identify objects. Target iOS and Android; primary frame size 390×844 with responsive auto layout.

Overall direction

Visual style: Professional, calm, utility-first. No flashy neon/AI gradients. Subtle depth, clear hierarchy, rounded-corner components, minimal chrome over live camera.
Accessibility: WCAG AA/AAA where possible. Use 8pt spacing grid; tap targets ≥ 48×48px; legible text sizes; never rely on color alone; provide labels with icons. Include screen-reader hints in annotations.
Voice-first: Prominent mic state and TTS controls. Clear state indicators (Idle / Listening / Speaking). Haptics and subtle animation affordances (ripple on listen, pulsing dot on continuous mode).
Brand and design system

Name: VisionMate. Create a simple wordmark + icon concept (a friendly “V” forming an eye shape, not literal surveillance).
Color (Light/Dark modes with high contrast):
Primary: Electric Blue #2F80FF (buttons, focus states)
Secondary/Accent: Teal #14B8A6 (status, active listening)
Background Light: #F7F9FC; Surface Light: #FFFFFF; Text Light: #0B1220
Background Dark: #0B0F14; Surface Dark: #121820; Text Dark: #F3F6FB
Info: #3B82F6; Success: #22C55E; Warning: #F59E0B; Error: #EF4444
Ensure contrast ≥ 4.5:1 for body text; provide on-color text tokens.
Typography: Inter or SF Pro (iOS) / Roboto (Android) with accessible sizes (Title 24–28, H1 20–22, H2 18–20, Body 16–18, Caption 14). Enable dynamic type variants.
Elevation: Subtle 1–4dp shadows for surfaces; no heavy glassmorphism.
Corner radii: Buttons 12; Chips 16; Cards/Sheets 16–20.
Iconography: Simple, thick-stroke line icons. Include Camera, Describe, Read, Object, Mic, Play/Pause/Stop, History, Settings, Download, Warning.
Core screens to design (with variants)

Splash + First-Run Onboarding

2–3 concise panels with large illustrations explaining: point camera → say “Describe” → hear results.
Final panel: permissions primer (camera/mic) with plain-language reasons.
Buttons: “Continue,” “Learn more about privacy,” “Grant permissions.”
Permission Flows

Camera permission request (pre-permission rationale card).
Microphone permission (for voice commands).
States: Granted / Denied / Partially granted with action buttons.
Error banner + inline help: “Open Settings to enable Camera for VisionMate.”
Home: Live Camera View (default landing)

Full-screen camera with minimal chrome.
Primary actions (large and reachable):
Center primary: “Describe” button (label + mic if voice trigger available).
Secondary large buttons: “Read Text,” “Identify Object.”
Mode selector (segmented control OR pill chips): Scene | Text | Object | Continuous.
Status bar: Idle (gray), Listening (teal ripple), Speaking (blue pulse).
Overlay hints: framing guide, focus reticle, safe-area indicators.
Quick actions bar: “Repeat last,” “Save,” “Share,” “Increase speed.”
Accessibility gestures (annotate): double-tap to describe; two-finger hold to pause/resume TTS; shake to describe.
Result Presentation (Bottom Sheet over Camera)

Collapsible bottom sheet with:
Title: “Scene description,” “Text readout,” or “Object identified.”
Content: large, readable text; real-time highlights (e.g., bounding boxes).
Controls: Play/Pause TTS, replay, speed (0.75x–2x), voice picker, “Save to History.”
For Text (OCR): “Copy,” “Save as Note,” “Language,” “Re-read slower.”
For Object ID: image thumbnail, top 1–3 matches with confidence tags, “Ask a follow-up” (voice).
States: Loading (skeleton + progress), Partial success (some text found), No result (guidance tips).
Continuous Mode

Toggle within Home to enable periodic updates.
Indicators: subtle top banner “Continuous mode ON,” pulsing dot; sensitivity/interval slider.
Safety copy: “Frequent audio may be distracting — adjust interval.”
Quick mute button.
History

List of past sessions: timestamp, type (Scene/Text/Object), short summary.
Detail view: full transcription/description, playback controls, share, delete. Tagging: “receipt,” “menu,” “door sign.”
Empty state: “Nothing yet — try Describe or Read.”
Settings

Sections:
Voice & Audio: TTS voice, speed, volume ducking toggle.
Input: Voice commands on/off, language.
Vision & OCR: Preferred language(s), reading order (auto, left-to-right), bounding boxes toggle.
Continuous Mode: interval, sensitivity, auto-pause on call.
Offline Packs (Stretch): basic labels download with size indicators; download/manage states.
Privacy: “Do not save frames,” “Anonymize requests,” clear history.
Accessibility: High contrast mode, Larger controls, Left-handed layout toggle, Haptic feedback.
About: version, acknowledgments.
Error/Empty/Offline States (reusable components)

No connectivity: offer Offline Mode (if available) + guidance.
Low light: “Increase light or move closer.”
Motion blur: “Hold steady; try again.”
Server error: retry + fallback suggestion.
Stretch Screens (design but clearly labeled “Stretch”)

Currency recognition: big denomination label, currency type, “Speak again” control.
Hazard/obstacle beta: “Step ahead,” “Person approaching” — simple banner alerts with safe color use.
Components to deliver as a library (with variants)

Buttons: Primary/Secondary/Tertiary; Sizes L/M; States default/hover/pressed/disabled/loading.
Icon buttons: with labels below (for accessibility).
Segmented control / Mode chips: selected/unselected/disabled.
Toggles and sliders: focus rings, labels, and value readouts.
Bottom sheet: sizes (Peek/Medium/Full), drag handle, scrim.
Banners: Info/Warning/Error/Success with actions.
Cards: Result card, History item card.
List items: with leading icon/thumbnail, trailing controls.
Input: Voice pill (Idle/Listening/Processing), text field (for fallback typing in demo).
OCR highlight frame: bounding box styles for text/objects.
Status indicators: Idle/Listening/Speaking/Offline.
Toasts: short confirmations.
Progress: linear and circular.
Microcopy (use these exact labels to avoid lorem ipsum)

Home CTAs: “Describe,” “Read Text,” “Identify Object”
Listening states: “Listening… speak now,” “Processing…,” “Speaking…”
Guidance: “Center the sign in view,” “Move closer,” “Hold steady”
Empty History: “Nothing here yet. Try Describe or Read.”
Offline: “You’re offline. Basic labels available.” / “Connect for richer descriptions.”
Permissions: “VisionMate needs your camera to see your surroundings.”
Prototyping and interactions

Link flows end-to-end: Onboarding → Permissions → Home → Bottom Sheet Result → Save to History → View History → Back to Camera.
Animations: 150–250ms ease-out for sheet transitions; gentle pulse for Listening/Speaking.
Haptic annotations: light on action, medium on success, warning on error (document in notes).
Voice state transitions: Idle (gray outline) → Listening (teal ripple) → Processing (blue spinner) → Speaking (blue pulse).
Developer handoff notes (annotate)

Safe areas for camera overlays; do not place primary controls at screen edges.
Touch targets ≥ 48×48px; minimum font size 16pt for body.
Modes are mutually exclusive; mode switch persists until changed.
Results sheet must be readable with dynamic type; ensure scrolling zones are obvious.
Include color/typography tokens and component variants named for export.
What to avoid

Overly flashy gradients or “AI” neon aesthetics.
Thin, low-contrast typography.
Icon-only actions without labels.
Complex nested menus; keep it flat and predictable.
Deliverables

Light + Dark themes.
Component library page with tokens and variants.
Screen flows for Tier 1 (full) and Tier 2 (core pieces), Stretch labeled as optional.
Clickable prototype that demonstrates camera-first home, describe/read flows, continuous mode toggle, and a saved history replay.
Name the file/pages

File: VisionMate — Hackathon MVP
Pages: 01 Library & Tokens, 02 Flows (Tier 1), 03 Flows (Tier 2), 04 Stretch, 05 Cover & Promo Mock