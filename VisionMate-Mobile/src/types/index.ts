// Shared types between Web and Mobile implementations
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

export interface AppSettings {
  ttsEnabled: boolean;
  ttsSpeed: number;
  voiceCommandsEnabled: boolean;
  highContrastMode: boolean;
  largeControlsMode: boolean;
  hapticFeedbackEnabled: boolean;
  continuousModeInterval: number;
  continuousModeEnabled: boolean;
  language: string;
  theme: "dark" | "light";
}

export interface AppState {
  hasSeenOnboarding: boolean;
  hasGrantedCameraPermission: boolean;
  hasGrantedMicrophonePermission: boolean;
  mode: "scene" | "text" | "object" | "continuous";
  history: HistoryItem[];
  settings: AppSettings;
  isOnline: boolean;
}

export type PermissionStatus = "granted" | "denied" | "undetermined" | "blocked";

export interface PermissionsState {
  camera: PermissionStatus;
  microphone: PermissionStatus;
  photo: PermissionStatus;
}
