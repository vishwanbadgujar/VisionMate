export interface VisionResult {
  type: "scene" | "text" | "object";
  content: string;
  timestamp: number;
  confidence?: number;
  details?: Record<string, unknown>;
}

export interface HistoryItem {
  id: string;
  type: "describe" | "read" | "identify" | "voice";
  content: string;
  timestamp: number;
  tags?: string[];
}

export interface AppState {
  screen: "welcome" | "permissions" | "home" | "settings" | "history";
  hasSeenOnboarding: boolean;
  hasGrantedCameraPermission: boolean;
  hasGrantedMicrophonePermission: boolean;
  mode: "scene" | "text" | "object" | "continuous";
  history: HistoryItem[];
  settings: AppSettings;
}

export interface AppSettings {
  ttsEnabled: boolean;
  ttsSpeed: number;
  voiceCommandsEnabled: boolean;
  highContrastMode: boolean;
  largeControlsMode: boolean;
  hapticFeedbackEnabled: boolean;
  continuousModeInterval: number;
  language: string;
}
