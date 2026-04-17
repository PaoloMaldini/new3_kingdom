export type GameStatKey = 'heaven' | 'politics' | 'military' | 'provisions'

export type Direction = 'left' | 'right'

export interface StatEffect {
  heaven?: number
  politics?: number
  military?: number
  provisions?: number
}

export interface Choice {
  direction: Direction
  label: string
  effects: StatEffect
  nextEventId?: string
  nextTimelineId?: string | null
  completionEventId?: string
  inventoryItem?: string
  triggerInventoryItem?: string
  requiredInventoryItem?: string
  conditionInventoryItem?: string
  ifHasInventoryItem?: string
  ifNotHasInventoryItem?: string
}

export interface BaseEvent {
  id: string
  character: string
  faction?: string
  description: string
  choices: [Choice, Choice]
}

export interface TimelineEvent extends BaseEvent {
  type: 'timeline'
  year: number
  nextTimelineId?: string | null
  sideEvents?: string[]
  isEnding?: boolean
  specialEndingId?: string
}

export interface SideEvent extends BaseEvent {
  type: 'side'
  sideId: string
  completionEventId?: string
  nextTimelineId?: string | null
  isEnding?: boolean
  specialEndingId?: string
}

export type GameEvent = TimelineEvent | SideEvent

export function isTimelineEvent(event: GameEvent): event is TimelineEvent {
  return event.type === 'timeline'
}

export function isSideEvent(event: GameEvent): event is SideEvent {
  return event.type === 'side'
}

export const CHARACTER_COLORS: Record<string, { bg: string; accent: string; emblem: string; image?: string }> = {
  '董卓': { bg: '#1a1515', accent: '#8b3a3a', emblem: '董', image: '/img/dongzhuo.png' },
  '袁绍': { bg: '#1B1B1B', accent: '#909090', emblem: '袁', image: '/img/yuanshao.png' },
  '曹操': { bg: '#1a2332', accent: '#4a6fa8', emblem: '曹', image: '/img/caocao.png' },
  '刘备': { bg: '#332F1F', accent: '#8A845A', emblem: '刘', image: '/img/liubei.png' },
  '孙坚': { bg: '#29331A', accent: '#4F8A4A', emblem: '孙', image: '/img/sunjian.png' },
  '陈宫': { bg: '#1a1525', accent: '#6f4a8b', emblem: '陈' },
  '曹嵩': { bg: '#2a2520', accent: '#8a7a5a', emblem: '曹' },
  '陶谦': { bg: '#1a1a15', accent: '#8b7a4a', emblem: '陶' },
  '汉献帝': { bg: '#151515', accent: '#d2b270', emblem: '漢' },
  '袁术': { bg: '#1B1B1B', accent: '#a09090', emblem: '袁' },
  '许攸': { bg: '#151a20', accent: '#4a6f8b', emblem: '许' },
  '张郃': { bg: '#1a2015', accent: '#6f8b4a', emblem: '张' },
  '郭嘉': { bg: '#151a20', accent: '#4a6f8b', emblem: '郭' },
  '刘表': { bg: '#1a1a20', accent: '#6f6f8b', emblem: '刘' },
  '黄盖': { bg: '#1a2015', accent: '#8a6f4a', emblem: '黄' },
  '韩遂': { bg: '#1a1515', accent: '#7a5a4a', emblem: '韩' },
  '荀彧': { bg: '#151a20', accent: '#4a6f8b', emblem: '荀' },
  '张鲁': { bg: '#1a1a15', accent: '#6f8a4a', emblem: '张' },
  '司马懿': { bg: '#1a1520', accent: '#5a4a6f', emblem: '司马' },
  '曹丕': { bg: '#1a2025', accent: '#5a6f8b', emblem: '曹' },
  '吕布': { bg: '#151515', accent: '#8a4a4a', emblem: '吕' },
  '关羽': { bg: '#151515', accent: '#8b4a4a', emblem: '羽' },
  '孙权': { bg: '#29331A', accent: '#4F8A4A', emblem: '孙' },
  '吕蒙': { bg: '#20251a', accent: '#5a7a4a', emblem: '吕' },
  '儒生': { bg: '#151515', accent: '#4a8b8b', emblem: '儒' },
  '商贾': { bg: '#151a15', accent: '#6f8b4a', emblem: '商' },
  '山贼': { bg: '#151515', accent: '#6f4a4a', emblem: '寇' },
  '黄巾余党': { bg: '#1a1515', accent: '#8b7a3a', emblem: '黃' },
  '匈奴单于': { bg: '#1a1515', accent: '#8b6f4a', emblem: '奴' },
  '张昭': { bg: '#1a1a15', accent: '#6f8b4a', emblem: '張' },
  '诸葛亮': { bg: '#151a1a', accent: '#4a8b6f', emblem: '葛' },
  '周瑜': { bg: '#1a151a', accent: '#8b4a6f', emblem: '周' },
  '鲁肃': { bg: '#1a1a15', accent: '#6f8b6f', emblem: '鲁' },
  '陆逊': { bg: '#1a1515', accent: '#5a6f8b', emblem: '陆' },
  '张飞': { bg: '#151515', accent: '#6f4a4a', emblem: '飞' },
  '赵云': { bg: '#151a15', accent: '#4a6f8b', emblem: '赵' },
  '马超': { bg: '#1a1515', accent: '#7a4a4a', emblem: '马' },
  '魏延': { bg: '#1a1515', accent: '#6f5a4a', emblem: '魏' },
  '姜维': { bg: '#151520', accent: '#4a6f8b', emblem: '姜' },
  '邓艾': { bg: '#1a1520', accent: '#5a5a6f', emblem: '邓' },
  '钟会': { bg: '#151a15', accent: '#4a5a6f', emblem: '钟' },
}

export function getCharacterVisual(character: string): { bg: string; accent: string; emblem: string; image?: string } {
  return CHARACTER_COLORS[character] || { bg: '#151520', accent: '#6f6f8b', emblem: character[0] }
}