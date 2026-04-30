const AUDIO_BASE_PATH = '/audio'

interface AudioConfig {
  src: string
  volume?: number
  fadeIn?: number
  fadeOut?: number
  maxDuration?: number
}

class AudioManager {
  private currentAudio: HTMLAudioElement | null = null
  private fadeInterval: number | null = null

  private playAudio(config: AudioConfig): Promise<void> {
    return new Promise((resolve) => {
      this.stopCurrent()

      const audio = new Audio()
      audio.src = AUDIO_BASE_PATH + '/' + config.src
      audio.volume = config.volume ?? 1.0

      audio.addEventListener('loadedmetadata', () => {
        let duration = audio.duration
        
        if (config.maxDuration && duration > config.maxDuration) {
          duration = config.maxDuration
        }

        audio.addEventListener('timeupdate', () => {
          if (config.fadeOut && audio.duration - audio.currentTime <= config.fadeOut) {
            this.startFade(audio, audio.volume, 0, config.fadeOut)
          }
        })

        if (config.fadeIn) {
          audio.volume = 0
          audio.addEventListener('canplay', () => {
            this.startFade(audio, 0, config.volume ?? 1.0, config.fadeIn ?? 0.5)
          }, { once: true })
        }

        audio.addEventListener('ended', () => {
          resolve()
        })

        audio.addEventListener('error', () => {
          resolve()
        })

        this.currentAudio = audio
        audio.play().catch(() => resolve())
        
        if (duration < Infinity) {
          setTimeout(() => {
            if (this.currentAudio === audio) {
              this.stopCurrent()
              resolve()
            }
          }, duration * 1000)
        }
      })

      audio.load()
    })
  }

  private startFade(audio: HTMLAudioElement, from: number, to: number, duration: number) {
    const steps = 20
    const stepDuration = (duration * 1000) / steps
    const stepValue = (to - from) / steps
    let currentStep = 0

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval)
    }

    this.fadeInterval = window.setInterval(() => {
      currentStep++
      audio.volume = Math.max(0, Math.min(1, from + stepValue * currentStep))
      
      if (currentStep >= steps) {
        audio.volume = to
        if (this.fadeInterval) {
          clearInterval(this.fadeInterval)
          this.fadeInterval = null
        }
      }
    }, stepDuration)
  }

  private stopCurrent() {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval)
      this.fadeInterval = null
    }
    
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
      this.currentAudio = null
    }
  }

  async playGoodEnding(): Promise<void> {
    await this.playAudio({
      src: '关羽之歌.mp3',
      volume: 0.8,
      fadeIn: 1,
      fadeOut: 2,
      maxDuration: 15
    })
  }

  async playBadEnding(): Promise<void> {
    await this.playAudio({
      src: '刘备之死.mp3',
      volume: 0.8,
      fadeIn: 1,
      fadeOut: 2,
      maxDuration: 15
    })
  }

  async playHighValueWarning(): Promise<void> {
    const sounds = ['噔噔噔噔噔噔.wav', '噔噔噔噔噔噔-两段.mp3']
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)]
    await this.playAudio({
      src: randomSound,
      volume: 0.6,
      fadeIn: 0.1,
      fadeOut: 0.3,
      maxDuration: 5
    })
  }

  async playLowValueWarning(): Promise<void> {
    const sounds = ['噔——.wav', '曹营.mp3']
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)]
    await this.playAudio({
      src: randomSound,
      volume: 0.6,
      fadeIn: 0.1,
      fadeOut: 0.3,
      maxDuration: 5
    })
  }

  stop(): void {
    this.stopCurrent()
  }
}

export const audioManager = new AudioManager()
