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

  // Light mode
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

export const TYPOGRAPHY = {
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 32,
  },
  h1: {
    fontSize: 22,
    fontWeight: "700" as const,
    lineHeight: 28,
  },
  h2: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 22,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: "500" as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 18,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};
