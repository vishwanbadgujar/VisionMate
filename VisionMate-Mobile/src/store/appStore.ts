import { create } from "zustand";
import { AppState, AppSettings } from "@/types";

const defaultSettings: AppSettings = {
  ttsEnabled: true,
  ttsSpeed: 1,
  voiceCommandsEnabled: true,
  highContrastMode: false,
  largeControlsMode: false,
  hapticFeedbackEnabled: true,
  continuousModeInterval: 5,
  continuousModeEnabled: false,
  language: "en",
  theme: "dark",
};

const defaultState: AppState = {
  hasSeenOnboarding: false,
  hasGrantedCameraPermission: false,
  hasGrantedMicrophonePermission: false,
  mode: "scene",
  history: [],
  settings: defaultSettings,
  isOnline: true,
};

interface AppStore extends AppState {
  // Permissions
  setPermissions: (camera: boolean, microphone: boolean) => void;
  // Settings
  updateSettings: (updates: Partial<AppSettings>) => void;
  // Mode
  setMode: (mode: "scene" | "text" | "object" | "continuous") => void;
  // Onboarding
  completeOnboarding: () => void;
  // History
  addToHistory: (item: any) => void;
  clearHistory: () => void;
  // Network
  setOnlineStatus: (isOnline: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  ...defaultState,

  setPermissions: (camera, microphone) =>
    set({
      hasGrantedCameraPermission: camera,
      hasGrantedMicrophonePermission: microphone,
    }),

  updateSettings: (updates) =>
    set((state) => ({
      settings: { ...state.settings, ...updates },
    })),

  setMode: (mode) => set({ mode }),

  completeOnboarding: () => set({ hasSeenOnboarding: true }),

  addToHistory: (item) =>
    set((state) => ({
      history: [item, ...state.history].slice(0, 100), // Keep last 100
    })),

  clearHistory: () => set({ history: [] }),

  setOnlineStatus: (isOnline) => set({ isOnline }),
}));
