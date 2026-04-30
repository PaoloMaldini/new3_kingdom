// 复用现有的GameStatKey, Direction, StatEffect类型
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
}

export interface BuildingEvent {
  id: string
  title: string
  year: number
  protagonist: string
  protagonistRole: string
  description: string
  choices: [Choice, Choice]
}

export interface BuildingLocation {
  province: string
  city: string
  coordinates: { x: number; y: number }
}

export type BuildingCategory = 'residence' | 'government' | 'palace' | 'bridge'
export type BuildingEra = '先秦' | '秦汉' | '魏晋南北朝' | '隋' | '隋唐' | '宋' | '宋辽金' | '金' | '元' | '明' | '清' | '明清' | '秦'

export interface AncientBuilding {
  id: string
  name: string
  category: BuildingCategory
  era: BuildingEra
  location: BuildingLocation
  description: string
  historicalSignificance: string
  scenarioIntro: string
  associatedFigures: string[]
  imageUrl?: string
  modelUrl?: string
  color: string
  events: BuildingEvent[]
}

export const BUILDING_CATEGORY_NAMES: Record<BuildingCategory, string> = {
  residence: '民居',
  government: '官府',
  palace: '皇宫',
  bridge: '桥梁',
}

export const BUILDING_CATEGORY_ICONS: Record<BuildingCategory, string> = {
  residence: '🏠',
  government: '🏛️',
  palace: '⛩️',
  bridge: '🌉',
}
