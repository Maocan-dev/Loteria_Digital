
class SoundPlayer {
  private audio: HTMLAudioElement | null = null;
  private isSoundEnabled: boolean = true;

  constructor() {
    this.audio = new Audio();
  }

  setEnabled(enabled: boolean): void {
    this.isSoundEnabled = enabled;
  }

  isEnabled(): boolean {
    return this.isSoundEnabled;
  }

  playCardSound(cardId: number): void {
    if (!this.isSoundEnabled) return;
    
    try {
      this.audio?.pause();
      this.audio = new Audio(`/sound/extendend/${cardId}.mp3`);
      this.audio.play().catch(error => {
        console.error("Failed to play sound:", error);
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  stop(): void {
    this.audio?.pause();
    if (this.audio) {
      this.audio.currentTime = 0;
    }
  }
}

const soundPlayer = new SoundPlayer();
export default soundPlayer;
