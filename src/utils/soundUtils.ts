
class SoundPlayer {
  private audio: HTMLAudioElement | null = null;
  private isSoundEnabled: boolean = true;
  private soundVersion: 'short' | 'extended' = 'short';

  constructor() {
    this.audio = new Audio();
  }

  setEnabled(enabled: boolean): void {
    this.isSoundEnabled = enabled;
  }

  isEnabled(): boolean {
    return this.isSoundEnabled;
  }

  setSoundVersion(version: 'short' | 'extended'): void {
    this.soundVersion = version;
  }

  getSoundVersion(): 'short' | 'extended' {
    return this.soundVersion;
  }

  playCardSound(cardId: number): void {
    if (!this.isSoundEnabled) return;
    
    try {
      this.audio?.pause();
      // Fix the folder path from "extendend" to "extended"
      const folderPath = this.soundVersion === 'short' ? '/sound/short/' : '/sound/extendend/';
      this.audio = new Audio(`${folderPath}${cardId}.mp3`);
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
