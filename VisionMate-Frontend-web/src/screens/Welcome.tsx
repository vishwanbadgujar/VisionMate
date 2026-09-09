import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { COLORS } from "@/theme/colors";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: COLORS.bgPage }}
    >
      <div className="max-w-md w-full">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
            style={{ backgroundColor: COLORS.primary }}
          >
            <span className="text-3xl font-bold text-white">V</span>
          </div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: COLORS.textPrimary }}
          >
            VisionMate
          </h1>
          <p
            className="text-lg"
            style={{ color: COLORS.textSecondary }}
          >
            Your AI accessibility companion
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-4 mb-8">
          {[
            {
              icon: "📷",
              title: "Describe",
              description: "Point your camera and hear scene descriptions",
            },
            {
              icon: "📖",
              title: "Read",
              description: "Extract and read text aloud instantly",
            },
            {
              icon: "🎯",
              title: "Identify",
              description: "Know what you're holding or looking at",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg"
              style={{ backgroundColor: COLORS.bgElevated }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: COLORS.textPrimary }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: COLORS.textSecondary }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate("/permissions")}
            className="w-full"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/permissions")}
            className="w-full"
          >
            Learn More
          </Button>
        </div>

        {/* Privacy notice */}
        <p
          className="text-xs text-center mt-6"
          style={{ color: COLORS.textMuted }}
        >
          Your privacy is our priority. Camera frames are processed securely and
          never stored without your consent.
        </p>
      </div>
    </div>
  );
}
