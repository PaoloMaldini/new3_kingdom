export interface Leader {
  id: string
  name?: string
  faction?: string
  color?: string
  summary?: string
  visual: {
    primaryColor: string
    secondaryColor: string
    emblem: string
    pattern: string
    image?: string
  }
}

export const leaders: Leader[] = [
  {
    id: 'placeholder-left',
    visual: {
      primaryColor: 'transparent',
      secondaryColor: 'transparent',
      emblem: '',
      pattern: '',
    },
  },
  {
    id: 'cao-cao',
    name: '曹操',
    faction: '乱世奸雄',
    color: '#6f8fd8',
    summary: '“只要曹孟德一息尚存，他就战无不胜！”',
    visual: {
      primaryColor: '#1a2332',
      secondaryColor: '#4a6fa8',
      emblem: '',
      pattern: 'diamond',
      image: '/img/caocao.png',
    },
  },
  {
    id: 'liu-bei',
    name: '刘备',
    faction: '仁义双剑',
    color: '#FACD05',
    summary: '"列位弟兄，随我接战，战至最后一刻，自刎归天！"',
    visual: {
      primaryColor: '#332F1F',
      secondaryColor: '#8A845A',
      emblem: '',
      pattern: 'oak',
      image: '/img/liubei.png',
    },
  },
  {
    id: 'sun-quan',
    name: '孙坚',
    faction: '江东之虎',
    color: '#ACD86F',
    summary: '"恭喜爹可以称帝了！"',
    visual: {
      primaryColor: '#29331A',
      secondaryColor: '#4F8A4A',
      emblem: '',
      pattern: 'wave',
      image: '/img/sunjian.png',
    },
  },
  
  
  {
    id: 'yuan-shao',
    name: '袁绍',
    faction: '联军盟主',
    color: '#909090',
    summary: '"此事皆因我迟疑而耽误，与列位公卿无关。"',
    visual: {
      primaryColor: '#1B1B1B',
      secondaryColor: '#868786',
      emblem: '',
      pattern: 'wave',
      image: '/img/yuanshao.png',
    },
  },
  {
    id: 'dong-zhuo',
    name: '董卓',
    faction: '苦命黄莲',
    color: '#c95f56',
    summary: '"咱家说了，咱家不怕酸！"',
    visual: {
      primaryColor: '#1a1515',
      secondaryColor: '#8b3a3a',
      emblem: '',
      pattern: 'diamond',
      image: '/img/dongzhuo.png',
    },
  },
  {
    id: 'placeholder-right',
    visual: {
      primaryColor: 'transparent',
      secondaryColor: 'transparent',
      emblem: '',
      pattern: '',
    },
  },
]

export function getLeaderById(id: string): Leader | undefined {
  return leaders.find(l => l.id === id)
}

export function isValidLeaderId(id: string): boolean {
  return leaders.some(l => l.id === id && !l.id.startsWith('placeholder'))
}