import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { COLORS } from "@/theme/colors";

type PermissionStatus = "prompt" | "granted" | "denied";

export default function Permissions() {
  const navigate = useNavigate();
  const [cameraStatus, setCameraStatus] = useState<PermissionStatus>("prompt");
  const [micStatus, setMicStatus] = useState<PermissionStatus>("prompt");
  const [checking, setChecking] = useState(true);

  // Check current permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      setChecking(true);
      try {
        // Check camera permission
        try {
          const cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          setCameraStatus("granted");
          cameraStream.getTracks().forEach((track) => track.stop());
        } catch (err: any) {
          if (err.name === "NotAllowedError") {
            setCameraStatus("denied");
          } else {
            setCameraStatus("prompt");
          }
        }

        // Check microphone permission
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
          });
          setMicStatus("granted");
          micStream.getTracks().forEach((track) => track.stop());
        } catch (err: any) {
          if (err.name === "NotAllowedError") {
            setMicStatus("denied");
          } else {
            setMicStatus("prompt");
          }
        }
      } finally {
        setChecking(false);
      }
    };

    checkPermissions();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setCameraStatus("granted");
      stream.getTracks().forEach((track) => track.stop());
    } catch (err: any) {
      setCameraStatus("denied");
    }
  };

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      setMicStatus("granted");
      stream.getTracks().forEach((track) => track.stop());
    } catch (err: any) {
      setMicStatus("denied");
    }
  };

  const handleContinue = () => {
    if (cameraStatus === "granted" && micStatus === "granted") {
      navigate("/home");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: COLORS.bgPage }}
    >
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: COLORS.textPrimary }}
          >
            Permissions
          </h1>
          <p
            className="text-lg"
            style={{ color: COLORS.textSecondary }}
          >
            We need access to use VisionMate
          </p>
        </div>

        {checking ? (
          <div className="text-center py-8">
            <div
              className="inline-block h-8 w-8 rounded-full border-4 border-t-4 animate-spin"
              style={{
                borderColor: COLORS.border,
                borderTopColor: COLORS.primary,
              }}
            ></div>
            <p
              className="mt-4 text-sm"
              style={{ color: COLORS.textSecondary }}
            >
              Checking permissions...
            </p>
          </div>
        ) : (
          <>
            {/* Permission Cards */}
            <div className="space-y-4 mb-8">
              {/* Camera Permission */}
              <Card
                variant="elevated"
                className={
                  cameraStatus === "granted" ? "border-green-500 border-2" : ""
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: COLORS.textPrimary }}
                    >
                      📷 Camera
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Capture scenes, read text, and identify objects
                    </p>
                    <p
                      className="text-xs mt-2"
                      style={{
                        color:
                          cameraStatus === "granted"
                            ? COLORS.success
                            : cameraStatus === "denied"
                              ? COLORS.error
                              : COLORS.textSecondary,
                      }}
                    >
                      {cameraStatus === "granted"
                        ? "✓ Granted"
                        : cameraStatus === "denied"
                          ? "✗ Denied"
                          : "Not yet granted"}
                    </p>
                  </div>
                  <div>
                    {cameraStatus === "granted" ? (
                      <span
                        className="text-2xl"
                        style={{ color: COLORS.success }}
                      >
                        ✓
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={requestCameraPermission}
                      >
                        Allow
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Microphone Permission */}
              <Card
                variant="elevated"
                className={
                  micStatus === "granted" ? "border-green-500 border-2" : ""
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: COLORS.textPrimary }}
                    >
                      🎤 Microphone
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: COLORS.textSecondary }}
                    >
                      Use voice commands and hear audio responses
                    </p>
                    <p
                      className="text-xs mt-2"
                      style={{
                        color:
                          micStatus === "granted"
                            ? COLORS.success
                            : micStatus === "denied"
                              ? COLORS.error
                              : COLORS.textSecondary,
                      }}
                    >
                      {micStatus === "granted"
                        ? "✓ Granted"
                        : micStatus === "denied"
                          ? "✗ Denied"
                          : "Not yet granted"}
                    </p>
                  </div>
                  <div>
                    {micStatus === "granted" ? (
                      <span
                        className="text-2xl"
                        style={{ color: COLORS.success }}
                      >
                        ✓
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={requestMicPermission}
                      >
                        Allow
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Info Banner */}
              <div
                className="p-4 rounded-lg border-l-4"
                style={{
                  backgroundColor: COLORS.bgElevated,
                  borderColor: COLORS.info,
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: COLORS.textSecondary }}
                >
                  ℹ️ These permissions can be changed anytime in Settings.
                </p>
              </div>

              {/* Denied Notice */}
              {(cameraStatus === "denied" || micStatus === "denied") && (
                <div
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    backgroundColor: COLORS.error + "20",
                    borderColor: COLORS.error,
                  }}
                >
                  <p
                    className="text-sm"
                    style={{ color: COLORS.error }}
                  >
                    ⚠️ Check your browser settings to enable permissions.
                  </p>
                </div>
              )}
            </div>

            {/* Status */}
            {cameraStatus === "granted" && micStatus === "granted" ? (
              <div
                className="p-4 rounded-lg mb-6 text-center"
                style={{
                  backgroundColor: COLORS.success + "20",
                  borderColor: COLORS.success,
                }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: COLORS.success }}
                >
                  ✓ All permissions granted
                </p>
              </div>
            ) : (
              <div
                className="p-4 rounded-lg mb-6 text-center"
                style={{
                  backgroundColor: COLORS.warning + "20",
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: COLORS.textSecondary }}
                >
                  Grant both permissions to continue
                </p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                variant="primary"
                onClick={handleContinue}
                disabled={
                  cameraStatus !== "granted" || micStatus !== "granted"
                }
                className="w-full"
              >
                Continue
              </Button>
              <Button
                size="lg"
                variant="tertiary"
                onClick={() => navigate("/")}
                className="w-full"
              >
                Back
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
