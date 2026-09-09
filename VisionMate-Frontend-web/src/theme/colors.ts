export const COLORS = {
  // Dark mode (default)
  bgPage: "#0B0F14",
  bgSurface: "#121820",
  bgElevated: "#1A2130",
  primary: "#2F80FF",
  teal: "#14B8A6",
  textPrimary: "#F3F6FB",
  textSecondary: "#8896A8",
  textMuted: "#4E5F72",
  border: "#1E2D40",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Light mode (for future)
  light: {
    bgPage: "#F7F9FC",
    bgSurface: "#FFFFFF",
    bgElevated: "#F0F4F8",
    primary: "#2F80FF",
    teal: "#14B8A6",
    textPrimary: "#0B1220",
    textSecondary: "#5B6B7B",
    textMuted: "#8B9BA8",
    border: "#D4DFE8",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
  },

  // Semantic
  focus: "#2F80FF",
  listeningIndicator: "#14B8A6",
  speakingIndicator: "#2F80FF",
  idleIndicator: "#4E5F72",
};

export type ColorKey = keyof typeof COLORS;
