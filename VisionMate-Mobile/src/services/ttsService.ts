import * as Speech from "expo-speech";

class TextToSpeechService {
  private isAvailable = true;
  private isSpeaking = false;

  async speak(text: string, rate: number = 1.0): Promise<void> {
    if (!this.isAvailable || this.isSpeaking) return;

    try {
      this.isSpeaking = true;
      await Speech.speak(text, {
        rate: Math.max(0.5, Math.min(2.0, rate)), // Clamp between 0.5 and 2.0
        language: "en",
        pitch: 1.0,
        onDone: () => {
          this.isSpeaking = false;
        },
        onError: (error) => {
          console.error("TTS error:", error);
          this.isSpeaking = false;
        },
      });
    } catch (error) {
      console.error("TTS speak error:", error);
      this.isSpeaking = false;
      this.isAvailable = false;
    }
  }

  stop(): void {
    try {
      Speech.stop();
      this.isSpeaking = false;
    } catch (error) {
      console.error("TTS stop error:", error);
    }
  }

  pause(): void {
    try {
      Speech.stop();
      this.isSpeaking = false;
    } catch (error) {
      console.error("TTS pause error:", error);
    }
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  getIsAvailable(): boolean {
    return this.isAvailable;
  }
}

export const ttsService = new TextToSpeechService();
