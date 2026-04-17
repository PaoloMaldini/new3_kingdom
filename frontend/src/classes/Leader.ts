export interface LeaderVisual {
  primaryColor: string
  secondaryColor: string
  emblem: string
  pattern: string
  image?: string
}

export class Leader {
  readonly id: string
  readonly name: string
  readonly faction: string
  readonly color: string
  readonly summary: string
  readonly visual: LeaderVisual
  readonly isPlaceholder: boolean

  constructor(data: {
    id: string
    name?: string
    faction?: string
    color?: string
    summary?: string
    visual: LeaderVisual
  }) {
    this.id = data.id
    this.name = data.name || ''
    this.faction = data.faction || ''
    this.color = data.color || '#6f8fd8'
    this.summary = data.summary || ''
    this.visual = data.visual
    this.isPlaceholder = data.id.startsWith('placeholder')
  }

  getEmblem(): string {
    return this.visual.emblem
  }

  getPrimaryColor(): string {
    return this.visual.primaryColor
  }

  getSecondaryColor(): string {
    return this.visual.secondaryColor
  }

  getImage(): string | undefined {
    return this.visual.image
  }

  hasImage(): boolean {
    return !!this.visual.image
  }

  isValid(): boolean {
    return !this.isPlaceholder && !!this.name
  }

  static fromData(data: {
    id: string
    name?: string
    faction?: string
    color?: string
    summary?: string
    visual: LeaderVisual
  }): Leader {
    return new Leader(data)
  }
}

const PLACEHOLDER_LEFT: LeaderVisual = {
  primaryColor: 'transparent',
  secondaryColor: 'transparent',
  emblem: '',
  pattern: '',
}

const PLACEHOLDER_RIGHT: LeaderVisual = {
  primaryColor: 'transparent',
  secondaryColor: 'transparent',
  emblem: '',
  pattern: '',
}

export const leaders: Leader[] = [
  new Leader({
    id: 'placeholder-left',
    visual: PLACEHOLDER_LEFT,
  }),
  new Leader({
    id: 'cao-cao',
    name: '曹操',
    faction: '曹魏',
    color: '#6f8fd8',
    summary: '挟天子以令诸侯，以权谋与武力统一北方。冷峻的铁血政治家，在乱世中寻求真正的天下太平。',
    visual: {
      primaryColor: '#1a2332',
      secondaryColor: '#4a6fa8',
      emblem: '曹',
      pattern: 'diamond',
      image: '/img/caocao.png',
    },
  }),
  new Leader({
    id: 'liu-bei',
    name: '刘备',
    faction: '蜀汉',
    color: '#7ab87a',
    summary: '以仁德服人，织席贩履却胸怀大志。与关羽、张飞桃园结义，誓要兴复汉室。',
    visual: {
      primaryColor: '#1f3324',
      secondaryColor: '#5a8a5a',
      emblem: '刘',
      pattern: 'oak',
    },
  }),
  new Leader({
    id: 'sun-quan',
    name: '孙权',
    faction: '东吴',
    color: '#d8a86f',
    summary: '继承父兄基业，坐拥江东六郡八十一州。年少即位却能稳住大局，长江天险守卫东吴。',
    visual: {
      primaryColor: '#33261a',
      secondaryColor: '#8a6a4a',
      emblem: '孙',
      pattern: 'wave',
    },
  }),
  new Leader({
    id: 'placeholder-right',
    visual: PLACEHOLDER_RIGHT,
  }),
]

export function getLeaderById(id: string): Leader | undefined {
  return leaders.find(l => l.id === id)
}

export function getAllLeaders(): Leader[] {
  return [...leaders]
}

export function getRealLeaders(): Leader[] {
  return leaders.filter(l => !l.isPlaceholder)
}

export function isValidLeaderId(id: string): boolean {
  const leader = getLeaderById(id)
  return leader ? leader.isValid() : false
}