import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { COLORS } from "@/theme/colors";

export default function Settings() {
  const navigate = useNavigate();
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [ttsSpeed, setTtsSpeed] = useState(1);
  const [voiceCommands, setVoiceCommands] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [continuousInterval, setContinuousInterval] = useState(5);

  const settingsGroups = [
    {
      title: "Voice & Audio",
      items: [
        {
          label: "Text-to-Speech",
          type: "toggle",
          value: ttsEnabled,
          onChange: setTtsEnabled,
        },
        {
          label: `Speech Speed (${ttsSpeed.toFixed(1)}x)`,
          type: "slider",
          value: ttsSpeed,
          onChange: setTtsSpeed,
          min: 0.5,
          max: 2,
          step: 0.1,
        },
      ],
    },
    {
      title: "Input",
      items: [
        {
          label: "Voice Commands",
          type: "toggle",
          value: voiceCommands,
          onChange: setVoiceCommands,
        },
      ],
    },
    {
      title: "Accessibility",
      items: [
        {
          label: "High Contrast Mode",
          type: "toggle",
          value: highContrast,
          onChange: setHighContrast,
        },
        {
          label: "Haptic Feedback",
          type: "toggle",
          value: hapticFeedback,
          onChange: setHapticFeedback,
        },
      ],
    },
    {
      title: "Continuous Mode",
      items: [
        {
          label: `Scan Interval (${continuousInterval}s)`,
          type: "slider",
          value: continuousInterval,
          onChange: setContinuousInterval,
          min: 2,
          max: 30,
          step: 1,
        },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: COLORS.bgPage }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between border-b"
        style={{ borderColor: COLORS.border }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-lg hover:bg-opacity-10"
            style={{
              color: COLORS.primary,
              backgroundColor: COLORS.primary + "10",
            }}
            title="Back"
            aria-label="Go back"
          >
            ←
          </button>
          <h1
            className="text-2xl font-bold"
            style={{ color: COLORS.textPrimary }}
          >
            Settings
          </h1>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="flex-1 overflow-auto p-4 pb-6">
        <div className="space-y-6 max-w-2xl">
          {settingsGroups.map((group) => (
            <div key={group.title}>
              <h2
                className="text-lg font-semibold mb-3 px-2"
                style={{ color: COLORS.textPrimary }}
              >
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.items.map((item, idx) => (
                  <Card key={idx} variant="elevated">
                    {item.type === "toggle" && (
                      <div className="flex items-center justify-between">
                        <label
                          className="font-medium cursor-pointer flex-1"
                          style={{ color: COLORS.textPrimary }}
                        >
                          {item.label}
                        </label>
                        <input
                          type="checkbox"
                          checked={item.value}
                          onChange={(e) =>
                            item.onChange(e.target.checked)
                          }
                          className="w-5 h-5"
                          style={{ accentColor: COLORS.primary }}
                        />
                      </div>
                    )}

                    {item.type === "slider" && (
                      <div>
                        <label
                          className="font-medium block mb-3"
                          style={{ color: COLORS.textPrimary }}
                        >
                          {item.label}
                        </label>
                        <input
                          type="range"
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          value={item.value}
                          onChange={(e) =>
                            item.onChange(
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full"
                          style={{
                            accentColor: COLORS.primary,
                          }}
                        />
                        <div className="flex justify-between mt-2 text-xs" style={{ color: COLORS.textMuted }}>
                          <span>{item.min}</span>
                          <span>{item.max}</span>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* About Section */}
          <div>
            <h2
              className="text-lg font-semibold mb-3 px-2"
              style={{ color: COLORS.textPrimary }}
            >
              About
            </h2>
            <Card variant="elevated">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    style={{ color: COLORS.textSecondary }}
                  >
                    App Version
                  </span>
                  <span
                    style={{ color: COLORS.textPrimary }}
                  >
                    1.0.0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    style={{ color: COLORS.textSecondary }}
                  >
                    Build
                  </span>
                  <span
                    style={{ color: COLORS.textPrimary }}
                  >
                    Web Prototype
                  </span>
                </div>
                <div className="pt-2 border-t" style={{ borderColor: COLORS.border }}>
                  <p
                    className="text-xs"
                    style={{ color: COLORS.textMuted }}
                  >
                    VisionMate — An AI accessibility companion that
                    helps you see and understand the world through
                    your camera, voice, and machine learning.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Privacy & Security */}
          <div>
            <h2
              className="text-lg font-semibold mb-3 px-2"
              style={{ color: COLORS.textPrimary }}
            >
              Privacy & Security
            </h2>
            <Card variant="elevated">
              <div className="space-y-3">
                <button
                  className="w-full text-left py-2"
                  style={{ color: COLORS.primary }}
                >
                  📋 Privacy Policy
                </button>
                <div
                  style={{ borderColor: COLORS.border }}
                  className="border-t"
                />
                <button
                  className="w-full text-left py-2"
                  style={{ color: COLORS.primary }}
                >
                  📜 Terms of Service
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
