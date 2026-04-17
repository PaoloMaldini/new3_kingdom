import type { TimelineEvent, SideEvent, StatEffect } from '../types'

function se(effects: StatEffect): StatEffect {
  return effects
}

export const dongZhuoTimeline: TimelineEvent[] = [
  {
    id: 'dz-tl-001',
    type: 'timeline',
    year: 189,
    character: '董卓',
    faction: '相国',
    description: '何进召董卓进京诛杀十常侍，大军浩浩荡荡向洛阳进发。',
    choices: [
      { direction: 'left', label: '急速进军', effects: se({ military: 15, heaven: 5 }), nextTimelineId: 'dz-tl-002' },
      { direction: 'right', label: '观望局势', effects: se({ provisions: 15, military: 5 }), nextTimelineId: 'dz-tl-002' },
    ],
  },
  {
    id: 'dz-tl-002',
    type: 'timeline',
    year: 189,
    character: '汉少帝',
    faction: '大汉天子',
    description: '董卓率军进入洛阳，废少帝立献帝，大权在握。',
    choices: [
      { direction: 'left', label: '废帝立新', effects: se({ heaven: -10, politics: 15 }), nextTimelineId: 'dz-tl-003' },
      { direction: 'right', label: '挟持天子', effects: se({ politics: 20, heaven: -5 }), nextTimelineId: 'dz-tl-003' },
    ],
  },
  {
    id: 'dz-tl-003',
    type: 'timeline',
    year: 189,
    character: '袁绍',
    faction: '渤海太守',
    description: '袁绍联合诸侯讨伐董卓，十八路诸侯会盟。',
    choices: [
      { direction: 'left', label: '进攻联军', effects: se({ military: 10, provisions: -5 }), nextTimelineId: 'dz-tl-004' },
      { direction: 'right', label: '固守洛阳', effects: se({ provisions: 20, military: 5 }), nextTimelineId: 'dz-tl-004' },
    ],
  },
  {
    id: 'dz-tl-004',
    type: 'timeline',
    year: 190,
    character: '吕布',
    faction: '温侯',
    description: '董卓收降吕布，势力大增，迁都长安以避联军锋芒。',
    choices: [
      { direction: 'left', label: '迁都长安', effects: se({ provisions: -10, heaven: -5 }), nextTimelineId: 'dz-tl-005' },
      { direction: 'right', label: '坚守洛阳', effects: se({ military: 10, provisions: -15 }), nextTimelineId: 'dz-tl-005' },
    ],
  },
  {
    id: 'dz-tl-005',
    type: 'timeline',
    year: 191,
    character: '王允',
    faction: '司徒',
    description: '王允使用美人计，貂蝉离间董卓与吕布。',
    choices: [
      { direction: 'left', label: '沉迷美色', effects: se({ heaven: -10, provisions: 5 }), nextTimelineId: 'dz-tl-006' },
      { direction: 'right', label: '保持警惕', effects: se({ military: 10, politics: 5 }), nextTimelineId: 'dz-tl-006' },
    ],
  },
  {
    id: 'dz-tl-006',
    type: 'timeline',
    year: 192,
    character: '貂蝉',
    faction: '司徒养女',
    description: '貂蝉在董卓与吕布之间周旋，凤仪亭相遇。',
    choices: [
      { direction: 'left', label: '相信貂蝉', effects: se({ heaven: -15, provisions: 5 }), nextTimelineId: 'dz-tl-007' },
      { direction: 'right', label: '怀疑此事', effects: se({ politics: 10, military: 5 }), nextTimelineId: 'dz-tl-007' },
    ],
  },
  {
    id: 'dz-tl-007',
    type: 'timeline',
    year: 192,
    character: '吕布',
    faction: '温侯',
    description: '王允设计诛杀董卓，吕布在未央宫刺杀董卓。',
    choices: [
      { direction: 'left', label: '反击吕布', effects: se({ military: -10, heaven: 5 }), nextTimelineId: 'dz-tl-008' },
      { direction: 'right', label: '仓皇逃跑', effects: se({ provisions: -10, military: -15 }), nextTimelineId: 'dz-tl-008' },
    ],
  },
  {
    id: 'dz-tl-008',
    type: 'timeline',
    year: 192,
    character: '李傕',
    faction: '凉州将领',
    description: '董卓死后，李傕郭汜攻占长安，混乱继续。',
    choices: [
      { direction: 'left', label: '招降李傕', effects: se({ military: 10, heaven: -5 }), nextTimelineId: 'dz-tl-009' },
      { direction: 'right', label: '逃出长安', effects: se({ provisions: 10, military: -10 }), nextTimelineId: 'dz-tl-009' },
    ],
  },
  {
    id: 'dz-tl-009',
    type: 'timeline',
    year: 192,
    character: '董卓',
    faction: '相国',
    description: '董卓暴尸街头，百姓欢腾。',
    choices: [
      { direction: 'left', label: '大势已去', effects: se({ heaven: -20, military: -10 }), nextTimelineId: 'dz-tl-end' },
      { direction: 'right', label: '历史终结', effects: se({ provisions: -5, military: -5 }), nextTimelineId: 'dz-tl-end' },
    ],
  },
]

export const dongZhuoSideEvents: SideEvent[] = [
  {
    id: 'dz-side-001',
    type: 'side',
    sideId: '收降吕布',
    character: '吕布',
    faction: '温侯',
    description: '吕布杀死丁原，投靠董卓。',
    choices: [
      { direction: 'left', label: '收降吕布', effects: se({ military: 20, heaven: -5 }), completionEventId: 'dz-side-001-complete' },
      { direction: 'right', label: '拒绝收留', effects: se({ military: -5, politics: 5 }), completionEventId: 'dz-side-001-complete' },
    ],
  },
  {
    id: 'dz-side-001-complete',
    type: 'side',
    sideId: '收降吕布',
    character: '董卓',
    faction: '相国',
    description: '吕布已归顺，势力大增。',
    choices: [
      { direction: 'left', label: '予以重用', effects: se({ military: 10 }) },
      { direction: 'right', label: '严密监视', effects: se({ politics: 5 }) },
    ],
  },
  {
    id: 'dz-side-002',
    type: 'side',
    sideId: '洛阳纵火',
    character: '董卓',
    faction: '相国',
    description: '董卓下令火烧洛阳，迁都长安。',
    choices: [
      { direction: 'left', label: '火烧洛阳', effects: se({ heaven: -15, provisions: 10 }), completionEventId: 'dz-side-002-complete' },
      { direction: 'right', label: '保全洛阳', effects: se({ heaven: 10, provisions: -10 }), completionEventId: 'dz-side-002-complete' },
    ],
  },
  {
    id: 'dz-side-002-complete',
    type: 'side',
    sideId: '洛阳纵火',
    character: '董卓',
    faction: '相国',
    description: '洛阳已毁，西迁长安。',
    choices: [
      { direction: 'left', label: '继续西迁', effects: se({ provisions: 5 }) },
      { direction: 'right', label: '休整军队', effects: se({ military: 5 }) },
    ],
  },
  {
    id: 'dz-side-003',
    type: 'side',
    sideId: '搜刮民财',
    character: '李儒',
    faction: '谋士',
    description: '李儒建议董卓搜刮洛阳财富，运往长安。',
    choices: [
      { direction: 'left', label: '大肆搜刮', effects: se({ provisions: 20, heaven: -15 }), completionEventId: 'dz-side-003-complete' },
      { direction: 'right', label: '适当收敛', effects: se({ provisions: 10, heaven: -5 }), completionEventId: 'dz-side-003-complete' },
    ],
  },
  {
    id: 'dz-side-003-complete',
    type: 'side',
    sideId: '搜刮民财',
    character: '董卓',
    faction: '相国',
    description: '财富已收集，准备西迁。',
    choices: [
      { direction: 'left', label: '运往长安', effects: se({ provisions: 10 }) },
      { direction: 'right', label: '犒赏军队', effects: se({ military: 10 }) },
    ],
  },
  {
    id: 'dz-side-004',
    type: 'side',
    sideId: '毒杀少帝',
    character: '李儒',
    faction: '谋士',
    description: '李儒建议毒杀少帝，以绝后患。',
    choices: [
      { direction: 'left', label: '毒杀少帝', effects: se({ heaven: -20, politics: 10 }), completionEventId: 'dz-side-004-complete' },
      { direction: 'right', label: '留其一命', effects: se({ heaven: 5, provisions: -5 }), completionEventId: 'dz-side-004-complete' },
    ],
  },
  {
    id: 'dz-side-004-complete',
    type: 'side',
    sideId: '毒杀少帝',
    character: '董卓',
    faction: '相国',
    description: '少帝已处理。',
    choices: [
      { direction: 'left', label: '继续掌权', effects: se({ politics: 10 }) },
      { direction: 'right', label: '更加残暴', effects: se({ heaven: -5 }) },
    ],
  },
]

export function getDongZhuoFirstTimelineId(): string {
  return dongZhuoTimeline[0]?.id || 'dz-tl-001'
}

export function getDongZhuoTimelineEvent(id: string): TimelineEvent | undefined {
  return dongZhuoTimeline.find(e => e.id === id)
}

export function getDongZhuoSideEvent(id: string): SideEvent | undefined {
  return dongZhuoSideEvents.find(e => e.id === id)
}