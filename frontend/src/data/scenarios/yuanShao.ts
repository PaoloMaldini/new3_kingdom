import type { TimelineEvent, SideEvent, StatEffect } from '../types'

function se(effects: StatEffect): StatEffect {
  return effects
}

export const yuanShaoTimeline: TimelineEvent[] = [
  {
    id: 'ys-tl-001',
    type: 'timeline',
    year: 189,
    character: '袁绍',
    faction: '渤海太守',
    description: '董卓废帝专权，袁绍被推举为盟主，召集诸侯讨伐董卓。',
    choices: [
      { direction: 'left', label: '担任盟主', effects: se({ heaven: 15, politics: 10 }), nextTimelineId: 'ys-tl-002' },
      { direction: 'right', label: '推辞不受', effects: se({ military: 5, provisions: 10 }), nextTimelineId: 'ys-tl-002' },
    ],
  },
  {
    id: 'ys-tl-002',
    type: 'timeline',
    year: 190,
    character: '袁绍',
    faction: '联军盟主',
    description: '诸侯会盟，袁绍为盟主，却各怀心思，联军停滞不前。',
    choices: [
      { direction: 'left', label: '积极进攻', effects: se({ military: 10, heaven: 5 }), nextTimelineId: 'ys-tl-003' },
      { direction: 'right', label: '保存实力', effects: se({ provisions: 15, military: 0 }), nextTimelineId: 'ys-tl-003' },
    ],
  },
  {
    id: 'ys-tl-003',
    type: 'timeline',
    year: 191,
    character: '袁绍',
    faction: '冀州牧',
    description: '袁绍夺取冀州，拥有了北方最大的根据地。',
    choices: [
      { direction: 'left', label: '攻略河北', effects: se({ military: 15, provisions: -5 }), nextTimelineId: 'ys-tl-004' },
      { direction: 'right', label: '稳固冀州', effects: se({ provisions: 15, military: 5 }), nextTimelineId: 'ys-tl-004' },
    ],
  },
  {
    id: 'ys-tl-004',
    type: 'timeline',
    year: 195,
    character: '袁绍',
    faction: '冀州牧',
    description: '袁绍击败公孙瓒，统一河北，势力达到巅峰。',
    choices: [
      { direction: 'left', label: '进攻曹操', effects: se({ military: 15, provisions: -10 }), nextTimelineId: 'ys-tl-005' },
      { direction: 'right', label: '休养生息', effects: se({ provisions: 20, military: 5 }), nextTimelineId: 'ys-tl-005' },
    ],
  },
  {
    id: 'ys-tl-005',
    type: 'timeline',
    year: 200,
    character: '曹操',
    faction: '兖州牧',
    description: '官渡之战爆发，袁绍率十万大军与曹操对峙。',
    choices: [
      { direction: 'left', label: '正面决战', effects: se({ military: 10, provisions: 5 }), nextTimelineId: 'ys-tl-006' },
      { direction: 'right', label: '持久对峙', effects: se({ provisions: 15, military: -5 }), nextTimelineId: 'ys-tl-006' },
    ],
  },
  {
    id: 'ys-tl-006',
    type: 'timeline',
    year: 200,
    character: '曹操',
    faction: '兖州牧',
    description: '曹操奇袭乌巢，袁绍大军崩溃。',
    choices: [
      { direction: 'left', label: '撤退北方', effects: se({ provisions: 10, military: -15 }), nextTimelineId: 'ys-tl-007' },
      { direction: 'right', label: '背水一战', effects: se({ military: -10, heaven: -5 }), nextTimelineId: 'ys-tl-007' },
    ],
  },
  {
    id: 'ys-tl-007',
    type: 'timeline',
    year: 202,
    character: '袁绍',
    faction: '冀州牧',
    description: '袁绍病逝，三个儿子争位，北方陷入混乱。',
    choices: [
      { direction: 'left', label: '传位袁谭', effects: se({ politics: 10, military: -5 }), nextTimelineId: 'ys-tl-008' },
      { direction: 'right', label: '传位袁尚', effects: se({ politics: 10, military: -5 }), nextTimelineId: 'ys-tl-008' },
    ],
  },
  {
    id: 'ys-tl-008',
    type: 'timeline',
    year: 204,
    character: '曹操',
    faction: '丞相',
    description: '曹操率军北上，攻打袁氏兄弟。',
    choices: [
      { direction: 'left', label: '联合抗曹', effects: se({ military: 10, provisions: -5 }), nextTimelineId: 'ys-tl-009' },
      { direction: 'right', label: '各自为战', effects: se({ military: -5, provisions: 10 }), nextTimelineId: 'ys-tl-009' },
    ],
  },
  {
    id: 'ys-tl-009',
    type: 'timeline',
    year: 207,
    character: '袁尚',
    faction: '冀州牧',
    description: '袁氏兄弟被曹操各个击破，北方统一。',
    choices: [
      { direction: 'left', label: '投奔乌桓', effects: se({ provisions: 10, military: -10 }), nextTimelineId: 'ys-tl-010' },
      { direction: 'right', label: '投降曹操', effects: se({ heaven: -10, provisions: 15 }), nextTimelineId: 'ys-tl-010' },
    ],
  },
  {
    id: 'ys-tl-010',
    type: 'timeline',
    year: 207,
    character: '袁尚',
    faction: '亡命之徒',
    description: '袁尚被曹操击杀，袁绍基业彻底覆灭。',
    choices: [
      { direction: 'left', label: '家族覆灭', effects: se({ heaven: -20, military: -10 }), nextTimelineId: 'ys-tl-end' },
      { direction: 'right', label: '历史终结', effects: se({ provisions: -5, military: -5 }), nextTimelineId: 'ys-tl-end' },
    ],
  },
]

export const yuanShaoSideEvents: SideEvent[] = [
  {
    id: 'ys-side-001',
    type: 'side',
    sideId: '兄弟同心',
    character: '袁绍',
    faction: '冀州牧',
    description: '袁绍与弟弟袁术不和，天下人耻笑。',
    choices: [
      { direction: 'left', label: '兄弟相争', effects: se({ military: 5, heaven: -10 }), completionEventId: 'ys-side-001-complete' },
      { direction: 'right', label: '握手言和', effects: se({ heaven: 10, politics: 5 }), completionEventId: 'ys-side-001-complete' },
    ],
  },
  {
    id: 'ys-side-001-complete',
    type: 'side',
    sideId: '兄弟同心',
    character: '袁绍',
    faction: '冀州牧',
    description: '兄弟关系修复。',
    choices: [
      { direction: 'left', label: '共同对外', effects: se({ military: 10 }) },
      { direction: 'right', label: '各自发展', effects: se({ provisions: 10 }) },
    ],
  },
  {
    id: 'ys-side-002',
    type: 'side',
    sideId: '谋士之争',
    character: '田丰',
    faction: '冀州别驾',
    description: '田丰与逢纪不和，向袁绍献策。',
    choices: [
      { direction: 'left', label: '采纳田丰', effects: se({ politics: 15, military: 5 }), completionEventId: 'ys-side-002-complete' },
      { direction: 'right', label: '信任逢纪', effects: se({ politics: 10, provisions: 5 }), completionEventId: 'ys-side-002-complete' },
    ],
  },
  {
    id: 'ys-side-002-complete',
    type: 'side',
    sideId: '谋士之争',
    character: '袁绍',
    faction: '冀州牧',
    description: '谋士安排已定。',
    choices: [
      { direction: 'left', label: '继续重用', effects: se({ politics: 5 }) },
      { direction: 'right', label: '观察表现', effects: se({ military: 5 }) },
    ],
  },
  {
    id: 'ys-side-003',
    type: 'side',
    sideId: '官渡对峙',
    character: '许攸',
    faction: '曹操谋士',
    description: '许攸背叛曹操，投靠袁绍。',
    choices: [
      { direction: 'left', label: '采纳建议', effects: se({ military: 15, provisions: 5 }), completionEventId: 'ys-side-003-complete' },
      { direction: 'right', label: '不予重用', effects: se({ politics: -5, provisions: 5 }), completionEventId: 'ys-side-003-complete' },
    ],
  },
  {
    id: 'ys-side-003-complete',
    type: 'side',
    sideId: '官渡对峙',
    character: '袁绍',
    faction: '冀州牧',
    description: '许攸献策未被采纳。',
    choices: [
      { direction: 'left', label: '追悔莫及', effects: se({ heaven: -5 }) },
      { direction: 'right', label: '另寻他法', effects: se({ military: 5 }) },
    ],
  },
  {
    id: 'ys-side-004',
    type: 'side',
    sideId: '河北平定',
    character: '麴义',
    faction: '河北名将',
    description: '麴义击败公孙瓒，立下大功。',
    choices: [
      { direction: 'left', label: '予以奖赏', effects: se({ military: 10, heaven: 5 }), completionEventId: 'ys-side-004-complete' },
      { direction: 'right', label: '猜忌防范', effects: se({ politics: -5, military: -5 }), completionEventId: 'ys-side-004-complete' },
    ],
  },
  {
    id: 'ys-side-004-complete',
    type: 'side',
    sideId: '河北平定',
    character: '袁绍',
    faction: '冀州牧',
    description: '河北平定，势力大增。',
    choices: [
      { direction: 'left', label: '继续扩张', effects: se({ military: 10 }) },
      { direction: 'right', label: '稳固统治', effects: se({ provisions: 10 }) },
    ],
  },
]

export function getYuanShaoFirstTimelineId(): string {
  return yuanShaoTimeline[0]?.id || 'ys-tl-001'
}

export function getYuanShaoTimelineEvent(id: string): TimelineEvent | undefined {
  return yuanShaoTimeline.find(e => e.id === id)
}

export function getYuanShaoSideEvent(id: string): SideEvent | undefined {
  return yuanShaoSideEvents.find(e => e.id === id)
}