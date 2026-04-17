import type { TimelineEvent, SideEvent, StatEffect } from '../types'

function se(effects: StatEffect): StatEffect {
  return effects
}

export const sunQuanTimeline: TimelineEvent[] = [
  {
    id: 'sq-tl-001',
    type: 'timeline',
    year: 189,
    character: '孙坚',
    faction: '长沙太守',
    description: '孙坚参与诸侯会盟，率军北上征讨董卓。',
    choices: [
      { direction: 'left', label: '追击董卓', effects: se({ military: 10, heaven: 5 }), nextTimelineId: 'sq-tl-002' },
      { direction: 'right', label: '保境安民', effects: se({ provisions: 10, military: 5 }), nextTimelineId: 'sq-tl-002' },
    ],
  },
  {
    id: 'sq-tl-002',
    type: 'timeline',
    year: 191,
    character: '袁术',
    faction: '仲家皇帝',
    description: '孙坚投靠袁术，率军夺取荆州。',
    choices: [
      { direction: 'left', label: '进攻刘表', effects: se({ military: 15, provisions: -5 }), nextTimelineId: 'sq-tl-003' },
      { direction: 'right', label: '防守观望', effects: se({ provisions: 10, military: 5 }), nextTimelineId: 'sq-tl-003' },
    ],
  },
  {
    id: 'sq-tl-003',
    type: 'timeline',
    year: 195,
    character: '孙策',
    faction: '江东小霸王',
    description: '孙坚战死，孙策继承父志，攻略江东。',
    choices: [
      { direction: 'left', label: '继承父志', effects: se({ military: 15, heaven: 10 }), nextTimelineId: 'sq-tl-004' },
      { direction: 'right', label: '投靠袁术', effects: se({ provisions: 15, military: -5 }), nextTimelineId: 'sq-tl-004' },
    ],
  },
  {
    id: 'sq-tl-004',
    type: 'timeline',
    year: 200,
    character: '孙策',
    faction: '会稽太守',
    description: '孙策平定江东六郡，建立孙吴基业。',
    choices: [
      { direction: 'left', label: '北上扩张', effects: se({ military: 15, provisions: -10 }), nextTimelineId: 'sq-tl-005' },
      { direction: 'right', label: '稳固江东', effects: se({ provisions: 15, military: 5 }), nextTimelineId: 'sq-tl-005' },
    ],
  },
  {
    id: 'sq-tl-005',
    type: 'timeline',
    year: 208,
    character: '周瑜',
    faction: '江夏太守',
    description: '曹操率军南下，周瑜力主抗曹，与刘备联军。',
    choices: [
      { direction: 'left', label: '联合刘备', effects: se({ military: 20, heaven: 10 }), nextTimelineId: 'sq-tl-006' },
      { direction: 'right', label: '独自抗曹', effects: se({ military: 15, provisions: 10 }), nextTimelineId: 'sq-tl-006' },
    ],
  },
  {
    id: 'sq-tl-006',
    type: 'timeline',
    year: 208,
    character: '周瑜',
    faction: '江夏太守',
    description: '赤壁之战，周瑜用火攻大败曹操。',
    choices: [
      { direction: 'left', label: '追击曹操', effects: se({ military: 15, provisions: 5 }), nextTimelineId: 'sq-tl-007' },
      { direction: 'right', label: '收取荆州', effects: se({ provisions: 20, politics: 10 }), nextTimelineId: 'sq-tl-007' },
    ],
  },
  {
    id: 'sq-tl-007',
    type: 'timeline',
    year: 210,
    character: '周瑜',
    faction: '大都督',
    description: '周瑜提议取蜀二分天下，却英年早逝。',
    choices: [
      { direction: 'left', label: '执行遗计', effects: se({ military: 15, provisions: -5 }), nextTimelineId: 'sq-tl-008' },
      { direction: 'right', label: '稳固江东', effects: se({ provisions: 15, military: 5 }), nextTimelineId: 'sq-tl-008' },
    ],
  },
  {
    id: 'sq-tl-008',
    type: 'timeline',
    year: 215,
    character: '鲁肃',
    faction: '江东口舌',
    description: '刘备借荆州不还，孙权决定武力夺取。',
    choices: [
      { direction: 'left', label: '进攻荆州', effects: se({ military: 20, heaven: -10 }), nextTimelineId: 'sq-tl-009' },
      { direction: 'right', label: '谈判和解', effects: se({ politics: 10, provisions: 10 }), nextTimelineId: 'sq-tl-009' },
    ],
  },
  {
    id: 'sq-tl-009',
    type: 'timeline',
    year: 219,
    character: '吕蒙',
    faction: '江东大都督',
    description: '吕蒙白衣渡江，夺取荆州，关羽败走麦城。',
    choices: [
      { direction: 'left', label: '杀掉关羽', effects: se({ heaven: 10, military: 5 }), nextTimelineId: 'sq-tl-010' },
      { direction: 'right', label: '放走关羽', effects: se({ heaven: -5, politics: 10 }), nextTimelineId: 'sq-tl-010' },
    ],
  },
  {
    id: 'sq-tl-010',
    type: 'timeline',
    year: 229,
    character: '孙权',
    faction: '吴大帝',
    description: '孙权称帝，建立吴国，三国鼎立正式形成。',
    choices: [
      { direction: 'left', label: '御驾亲征', effects: se({ military: 15, provisions: -10 }), nextTimelineId: 'sq-tl-end' },
      { direction: 'right', label: '固守江东', effects: se({ provisions: 20, military: 5 }), nextTimelineId: 'sq-tl-end' },
    ],
  },
]

export const sunQuanSideEvents: SideEvent[] = [
  {
    id: 'sq-side-001',
    type: 'side',
    sideId: '江东基业',
    character: '孙策',
    faction: '江东小霸王',
    description: '孙策在江东招贤纳士，扩充实力。',
    choices: [
      { direction: 'left', label: '广招人才', effects: se({ politics: 15, military: 10 }), completionEventId: 'sq-side-001-complete' },
      { direction: 'right', label: '训练军队', effects: se({ military: 15, provisions: -5 }), completionEventId: 'sq-side-001-complete' },
    ],
  },
  {
    id: 'sq-side-001-complete',
    type: 'side',
    sideId: '江东基业',
    character: '孙策',
    faction: '会稽太守',
    description: '江东基业初成，势力大增。',
    choices: [
      { direction: 'left', label: '继续扩张', effects: se({ military: 10 }) },
      { direction: 'right', label: '稳固发展', effects: se({ provisions: 10 }) },
    ],
  },
  {
    id: 'sq-side-002',
    type: 'side',
    sideId: '赤壁之战',
    character: '黄盖',
    faction: '江东老将',
    description: '黄盖提出火攻计策，愿诈降曹操。',
    choices: [
      { direction: 'left', label: '实施火攻', effects: se({ military: 20, heaven: 15 }), completionEventId: 'sq-side-002-complete' },
      { direction: 'right', label: '稳妥推进', effects: se({ provisions: 10, military: 5 }), completionEventId: 'sq-side-002-complete' },
    ],
  },
  {
    id: 'sq-side-002-complete',
    type: 'side',
    sideId: '赤壁之战',
    character: '周瑜',
    faction: '江夏太守',
    description: '赤壁大胜，曹操北退。',
    choices: [
      { direction: 'left', label: '扩大战果', effects: se({ military: 10 }) },
      { direction: 'right', label: '稳固战果', effects: se({ provisions: 10 }) },
    ],
  },
  {
    id: 'sq-side-003',
    type: 'side',
    sideId: '夺荆州',
    character: '吕蒙',
    faction: '江东大都督',
    description: '吕蒙装病，推荐陆逊代替，麻痹关羽。',
    choices: [
      { direction: 'left', label: '白衣渡江', effects: se({ military: 15, heaven: 10 }), completionEventId: 'sq-side-003-complete' },
      { direction: 'right', label: '正面进攻', effects: se({ military: 10, provisions: -10 }), completionEventId: 'sq-side-003-complete' },
    ],
  },
  {
    id: 'sq-side-003-complete',
    type: 'side',
    sideId: '夺荆州',
    character: '孙权',
    faction: '吴王',
    description: '荆州已夺，关羽被擒。',
    choices: [
      { direction: 'left', label: '杀掉关羽', effects: se({ heaven: 10, military: 5 }) },
      { direction: 'right', label: '礼送出境', effects: se({ heaven: -5, politics: 5 }) },
    ],
  },
  {
    id: 'sq-side-004',
    type: 'side',
    sideId: '夷陵之战',
    character: '陆逊',
    faction: '江东大都督',
    description: '陆逊火烧连营，大败刘备。',
    choices: [
      { direction: 'left', label: '乘胜追击', effects: se({ military: 15, provisions: 5 }), completionEventId: 'sq-side-004-complete' },
      { direction: 'right', label: '见好就收', effects: se({ provisions: 15, military: 5 }), completionEventId: 'sq-side-004-complete' },
    ],
  },
  {
    id: 'sq-side-004-complete',
    type: 'side',
    sideId: '夷陵之战',
    character: '陆逊',
    faction: '江东大都督',
    description: '刘备败退，吴国大胜。',
    choices: [
      { direction: 'left', label: '庆祝胜利', effects: se({ heaven: 10 }) },
      { direction: 'right', label: '稳固防线', effects: se({ military: 10 }) },
    ],
  },
]

export function getSunQuanFirstTimelineId(): string {
  return sunQuanTimeline[0]?.id || 'sq-tl-001'
}

export function getSunQuanTimelineEvent(id: string): TimelineEvent | undefined {
  return sunQuanTimeline.find(e => e.id === id)
}

export function getSunQuanSideEvent(id: string): SideEvent | undefined {
  return sunQuanSideEvents.find(e => e.id === id)
}