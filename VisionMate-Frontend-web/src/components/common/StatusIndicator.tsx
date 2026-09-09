import { COLORS } from "@/theme/colors";

export interface StatusIndicatorProps {
  status: "idle" | "listening" | "speaking" | "processing" | "offline";
  label?: string;
}

export default function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const statusConfig = {
    idle: {
      color: COLORS.textMuted,
      label: "Idle",
      animation: "bg-opacity-100",
    },
    listening: {
      color: COLORS.teal,
      label: "Listening",
      animation: "animate-pulse",
    },
    speaking: {
      color: COLORS.primary,
      label: "Speaking",
      animation: "animate-pulse",
    },
    processing: {
      color: COLORS.primary,
      label: "Processing",
      animation: "animate-spin",
    },
    offline: {
      color: COLORS.error,
      label: "Offline",
      animation: "bg-opacity-50",
    },
  };

  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${config.animation}`}
        style={{ backgroundColor: config.color }}
      />
      <span
        className="text-sm font-medium"
        style={{ color: config.color }}
      >
        {displayLabel}
      </span>
    </div>
  );
}
