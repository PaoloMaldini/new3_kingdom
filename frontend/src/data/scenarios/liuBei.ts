import type { TimelineEvent, SideEvent, StatEffect } from '../types'

function se(effects: StatEffect): StatEffect {
  return effects
}

export const liuBeiTimeline: TimelineEvent[] = [
  {
    id: 'lb-tl-001',
    type: 'timeline',
    year: 189,
    character: '刘备',
    faction: '平原相',
    description: '刘备以平原相身份参与诸侯会盟，偶得中山靖王之后的名号。',
    choices: [
      { direction: 'left', label: '依附公孙瓒', effects: se({ military: 10, provisions: 5 }), nextTimelineId: 'lb-tl-002' },
      { direction: 'right', label: '前往洛阳', effects: se({ heaven: 10, politics: 5 }), nextTimelineId: 'lb-tl-002' },
    ],
  },
  {
    id: 'lb-tl-002',
    type: 'timeline',
    year: 191,
    character: '曹操',
    faction: '兖州牧',
    description: '曹操表奏刘备为豫州牧，刘备首次拥有自己的地盘。',
    choices: [
      { direction: 'left', label: '接纳人才', effects: se({ politics: 10, heaven: 5 }), nextTimelineId: 'lb-tl-003' },
      { direction: 'right', label: '训练军队', effects: se({ military: 10, provisions: -5 }), nextTimelineId: 'lb-tl-003' },
    ],
  },
  {
    id: 'lb-tl-003',
    type: 'timeline',
    year: 194,
    character: '陶谦',
    faction: '徐州牧',
    description: '陶谦病逝，将徐州托付给刘备。',
    choices: [
      { direction: 'left', label: '接受徐州', effects: se({ provisions: 20, politics: 10 }), nextTimelineId: 'lb-tl-004' },
      { direction: 'right', label: '婉言谢绝', effects: se({ heaven: 10, military: 5 }), nextTimelineId: 'lb-tl-004' },
    ],
  },
  {
    id: 'lb-tl-004',
    type: 'timeline',
    year: 196,
    character: '吕布',
    faction: '温侯',
    description: '吕布夺取徐州，刘备失去根基，被迫投靠曹操。',
    choices: [
      { direction: 'left', label: '联合曹操', effects: se({ military: 15, provisions: 10 }), nextTimelineId: 'lb-tl-005' },
      { direction: 'right', label: '暂避锋芒', effects: se({ provisions: 10, military: -5 }), nextTimelineId: 'lb-tl-005' },
    ],
  },
  {
    id: 'lb-tl-005',
    type: 'timeline',
    year: 200,
    character: '曹操',
    faction: '丞相',
    description: '曹操与刘备青梅煮酒论英雄："天下英雄，唯使君与操耳！"',
    choices: [
      { direction: 'left', label: '谨慎应对', effects: se({ politics: 15, heaven: 5 }), nextTimelineId: 'lb-tl-006' },
      { direction: 'right', label: '韬光养晦', effects: se({ provisions: 15, military: -5 }), nextTimelineId: 'lb-tl-006' },
    ],
  },
  {
    id: 'lb-tl-006',
    type: 'timeline',
    year: 207,
    character: '诸葛亮',
    faction: '卧龙',
    description: '刘备三顾茅庐请诸葛亮出山，隆中对策定三分天下。',
    choices: [
      { direction: 'left', label: '恳请出山', effects: se({ heaven: 20, politics: 15 }), nextTimelineId: 'lb-tl-007' },
      { direction: 'right', label: '日后再请', effects: se({ provisions: 10, military: 5 }), nextTimelineId: 'lb-tl-007' },
    ],
  },
  {
    id: 'lb-tl-007',
    type: 'timeline',
    year: 208,
    character: '周瑜',
    faction: '江夏太守',
    description: '赤壁之战，刘备与孙权联军大败曹操。',
    choices: [
      { direction: 'left', label: '追击曹操', effects: se({ military: 15, provisions: 5 }), nextTimelineId: 'lb-tl-008' },
      { direction: 'right', label: '夺取荆州', effects: se({ provisions: 20, politics: 10 }), nextTimelineId: 'lb-tl-008' },
    ],
  },
  {
    id: 'lb-tl-008',
    type: 'timeline',
    year: 214,
    character: '刘璋',
    faction: '益州牧',
    description: '刘备率军入蜀，夺取益州，建立蜀汉基业。',
    choices: [
      { direction: 'left', label: '攻取成都', effects: se({ military: 20, provisions: 15 }), nextTimelineId: 'lb-tl-009' },
      { direction: 'right', label: '安抚百姓', effects: se({ heaven: 15, politics: 15 }), nextTimelineId: 'lb-tl-009' },
    ],
  },
  {
    id: 'lb-tl-009',
    type: 'timeline',
    year: 219,
    character: '关羽',
    faction: '汉寿亭侯',
    description: '关羽水淹七军，威震华夏，却被孙权偷袭荆州。',
    choices: [
      { direction: 'left', label: '发兵救援', effects: se({ military: 15, provisions: -10 }), nextTimelineId: 'lb-tl-010' },
      { direction: 'right', label: '固守益州', effects: se({ provisions: 15, military: -5 }), nextTimelineId: 'lb-tl-010' },
    ],
  },
  {
    id: 'lb-tl-010',
    type: 'timeline',
    year: 221,
    character: '刘备',
    faction: '蜀汉皇帝',
    description: '刘备称帝，建立蜀汉。随后夷陵之战被陆逊击败。',
    choices: [
      { direction: 'left', label: '御驾亲征', effects: se({ military: 10, heaven: -10 }), nextTimelineId: 'lb-tl-end' },
      { direction: 'right', label: '托孤白帝', effects: se({ heaven: 10, politics: 5 }), nextTimelineId: 'lb-tl-end' },
    ],
  },
]

export const liuBeiSideEvents: SideEvent[] = [
  {
    id: 'lb-side-001',
    type: 'side',
    sideId: '桃园结义',
    character: '关羽',
    faction: '结义兄弟',
    description: '刘备与关羽、张飞桃园结义，誓共生死。',
    choices: [
      { direction: 'left', label: '义结金兰', effects: se({ heaven: 15, military: 10 }), completionEventId: 'lb-side-001-complete' },
      { direction: 'right', label: '各奔东西', effects: se({ provisions: 10, military: -5 }), completionEventId: 'lb-side-001-complete' },
    ],
  },
  {
    id: 'lb-side-001-complete',
    type: 'side',
    sideId: '桃园结义',
    character: '刘备',
    faction: '蜀汉',
    description: '兄弟三人结义，共享富贵。',
    choices: [
      { direction: 'left', label: '共谋大业', effects: se({ military: 10 }) },
      { direction: 'right', label: '巩固情义', effects: se({ heaven: 5 }) },
    ],
  },
  {
    id: 'lb-side-002',
    type: 'side',
    sideId: '三顾茅庐',
    character: '诸葛亮',
    faction: '卧龙',
    description: '刘备第三次拜访诸葛亮，诸葛亮被其诚心打动。',
    choices: [
      { direction: 'left', label: '以诚相待', effects: se({ heaven: 20, politics: 10 }), completionEventId: 'lb-side-002-complete' },
      { direction: 'right', label: '以礼相聘', effects: se({ politics: 15, provisions: 5 }), completionEventId: 'lb-side-002-complete' },
    ],
  },
  {
    id: 'lb-side-002-complete',
    type: 'side',
    sideId: '三顾茅庐',
    character: '诸葛亮',
    faction: '蜀汉',
    description: '诸葛亮出山辅佐刘备。',
    choices: [
      { direction: 'left', label: '全力信任', effects: se({ politics: 10 }) },
      { direction: 'right', label: '委以重任', effects: se({ military: 10 }) },
    ],
  },
  {
    id: 'lb-side-003',
    type: 'side',
    sideId: '借荆州',
    character: '鲁肃',
    faction: '江东口舌',
    description: '刘备向孙权借荆州作为根基。',
    choices: [
      { direction: 'left', label: '正式借取', effects: se({ provisions: 20, politics: -5 }), completionEventId: 'lb-side-003-complete' },
      { direction: 'right', label: '婉拒借用', effects: se({ heaven: 10, military: 5 }), completionEventId: 'lb-side-003-complete' },
    ],
  },
  {
    id: 'lb-side-003-complete',
    type: 'side',
    sideId: '借荆州',
    character: '刘备',
    faction: '荆州牧',
    description: '荆州已借得，有了自己的根据地。',
    choices: [
      { direction: 'left', label: '发展建设', effects: se({ provisions: 10 }) },
      { direction: 'right', label: '训练军队', effects: se({ military: 10 }) },
    ],
  },
  {
    id: 'lb-side-004',
    type: 'side',
    sideId: '夷陵之战',
    character: '陆逊',
    faction: '江东大都督',
    description: '刘备率军伐吴，被陆逊火烧连营。',
    choices: [
      { direction: 'left', label: '拼死一搏', effects: se({ military: -15, heaven: -10 }), completionEventId: 'lb-side-004-complete' },
      { direction: 'right', label: '及时撤退', effects: se({ provisions: 10, military: -10 }), completionEventId: 'lb-side-004-complete' },
    ],
  },
  {
    id: 'lb-side-004-complete',
    type: 'side',
    sideId: '夷陵之战',
    character: '刘备',
    faction: '蜀汉皇帝',
    description: '夷陵战败，刘备退守白帝城。',
    choices: [
      { direction: 'left', label: '重整旗鼓', effects: se({ military: 5 }) },
      { direction: 'right', label: '托孤诸葛亮', effects: se({ heaven: 10 }) },
    ],
  },
]

export function getLiuBeiFirstTimelineId(): string {
  return liuBeiTimeline[0]?.id || 'lb-tl-001'
}

export function getLiuBeiTimelineEvent(id: string): TimelineEvent | undefined {
  return liuBeiTimeline.find(e => e.id === id)
}

export function getLiuBeiSideEvent(id: string): SideEvent | undefined {
  return liuBeiSideEvents.find(e => e.id === id)
}