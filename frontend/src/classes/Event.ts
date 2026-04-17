export type GameStatKey = 'heaven' | 'politics' | 'military' | 'provisions'

export type Direction = 'left' | 'right'

export class StatEffect {
  readonly heaven?: number
  readonly politics?: number
  readonly military?: number
  readonly provisions?: number

  constructor(effects: {
    heaven?: number
    politics?: number
    military?: number
    provisions?: number
  } = {}) {
    this.heaven = effects.heaven
    this.politics = effects.politics
    this.military = effects.military
    this.provisions = effects.provisions
  }

  getEffect(stat: GameStatKey): number {
    return this[stat] ?? 0
  }

  getChange(stat: GameStatKey): 'increase' | 'decrease' | 'neutral' {
    const value = this.getEffect(stat)
    if (value > 0) return 'increase'
    if (value < 0) return 'decrease'
    return 'neutral'
  }

  hasAnyEffect(): boolean {
    return !!(this.heaven || this.politics || this.military || this.provisions)
  }

  getAllEffects(): Array<{ stat: GameStatKey; value: number }> {
    const effects: Array<{ stat: GameStatKey; value: number }> = []
    if (this.heaven) effects.push({ stat: 'heaven', value: this.heaven })
    if (this.politics) effects.push({ stat: 'politics', value: this.politics })
    if (this.military) effects.push({ stat: 'military', value: this.military })
    if (this.provisions) effects.push({ stat: 'provisions', value: this.provisions })
    return effects
  }

  static ZERO = new StatEffect()
}

export class Choice {
  readonly direction: Direction
  readonly label: string
  readonly effects: StatEffect

  constructor(data: {
    direction: Direction
    label: string
    effects: StatEffect | { heaven?: number; politics?: number; military?: number; provisions?: number }
  }) {
    this.direction = data.direction
    this.label = data.label
    this.effects = data.effects instanceof StatEffect ? data.effects : new StatEffect(data.effects)
  }

  getDirection(): Direction {
    return this.direction
  }

  getLabel(): string {
    return this.label
  }

  getEffects(): StatEffect {
    return this.effects
  }
}

export class GameEvent {
  readonly id: string
  readonly character: string
  readonly faction?: string
  readonly description: string
  readonly choices: [Choice, Choice]
  readonly nextCardId?: string
  readonly leader?: 'cao-cao' | 'liu-bei' | 'sun-quan'

  constructor(data: {
    id: string
    character: string
    faction?: string
    description: string
    choices: [Choice, Choice]
    nextCardId?: string
    leader?: 'cao-cao' | 'liu-bei' | 'sun-quan'
  }) {
    this.id = data.id
    this.character = data.character
    this.faction = data.faction
    this.description = data.description
    this.choices = data.choices
    this.nextCardId = data.nextCardId
    this.leader = data.leader
  }

  getId(): string {
    return this.id
  }

  getCharacter(): string {
    return this.character
  }

  getFaction(): string {
    return this.faction || ''
  }

  getDescription(): string {
    return this.description
  }

  getLeftChoice(): Choice {
    return this.choices[0]
  }

  getRightChoice(): Choice {
    return this.choices[1]
  }

  getNextCardId(): string | undefined {
    return this.nextCardId
  }

  getLeader(): 'cao-cao' | 'liu-bei' | 'sun-quan' | undefined {
    return this.leader
  }

  hasNextEvent(): boolean {
    return !!this.nextCardId
  }

  getCharacterEmblem(): string {
    return this.character[0]
  }

  static fromData(data: {
    id: string
    character: string
    faction?: string
    description: string
    choices: [
      { direction: Direction; label: string; effects: { heaven?: number; politics?: number; military?: number; provisions?: number } },
      { direction: Direction; label: string; effects: { heaven?: number; politics?: number; military?: number; provisions?: number } }
    ]
    nextCardId?: string
    leader?: 'cao-cao' | 'liu-bei' | 'sun-quan'
  }): GameEvent {
    return new GameEvent({
      id: data.id,
      character: data.character,
      faction: data.faction,
      description: data.description,
      choices: [
        new Choice({ direction: data.choices[0].direction, label: data.choices[0].label, effects: data.choices[0].effects }),
        new Choice({ direction: data.choices[1].direction, label: data.choices[1].label, effects: data.choices[1].effects }),
      ],
      nextCardId: data.nextCardId,
      leader: data.leader,
    })
  }
}

export const CHARACTER_COLORS: Record<string, { bg: string; accent: string; emblem: string }> = {
  '董卓': { bg: '#1a1515', accent: '#8b3a3a', emblem: '董' },
  '袁绍': { bg: '#1a1520', accent: '#6f4a8b', emblem: '袁' },
  '荀彧': { bg: '#151a20', accent: '#4a6f8b', emblem: '荀' },
  '关羽': { bg: '#151515', accent: '#8b4a4a', emblem: '羽' },
  '陶谦': { bg: '#1a1a15', accent: '#8b7a4a', emblem: '陶' },
  '诸葛亮': { bg: '#151a1a', accent: '#4a8b6f', emblem: '葛' },
  '孙坚': { bg: '#151a1a', accent: '#4a6f8b', emblem: '孫' },
  '周瑜': { bg: '#1a151a', accent: '#8b4a6f', emblem: '周' },
  '张昭': { bg: '#1a1a15', accent: '#6f8b4a', emblem: '張' },
  '汉献帝': { bg: '#151515', accent: '#d2b270', emblem: '漢' },
  '匈奴单于': { bg: '#1a1515', accent: '#8b6f4a', emblem: '奴' },
  '商贾': { bg: '#151a15', accent: '#6f8b4a', emblem: '商' },
  '儒生': { bg: '#151515', accent: '#4a8b8b', emblem: '儒' },
  '山贼': { bg: '#151515', accent: '#6f4a4a', emblem: '寇' },
  '黄巾余党': { bg: '#1a1515', accent: '#8b7a3a', emblem: '黃' },
}

export function getCharacterVisual(character: string): { bg: string; accent: string; emblem: string } {
  return CHARACTER_COLORS[character] || { bg: '#151520', accent: '#6f6f8b', emblem: character[0] }
}