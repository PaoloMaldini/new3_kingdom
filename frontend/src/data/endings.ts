export type EndingCause = 'heaven' | 'politics' | 'military' | 'provisions'

export type EndingCategory = 'normal' | 'special'

export type SpecialEndingType = 'good' | 'bad'

export interface Ending {
  id: string
  category: EndingCategory
  cause?: EndingCause
  isHigh?: boolean
  title: string
  description: string
  character?: string
  specialType?: SpecialEndingType
}

export const endings: Ending[] = [
  {
    id: 'ending-heaven-high',
    category: 'normal',
    cause: 'heaven',
    isHigh: true,
    title: '受命于天',
    description: '天下万民皆视你为天命所归。各路诸侯纷纷来降，你终于完成统一大业，建立新的王朝。',
  },
  {
    id: 'ending-heaven-low',
    category: 'normal',
    cause: 'heaven',
    isHigh: false,
    title: '天命已失',
    description: '你失去了上天的眷顾。百姓离心，诸侯背弃，曾经的雄心壮志化为泡影。',
  },
  {
    id: 'ending-politics-high',
    category: 'normal',
    cause: 'politics',
    isHigh: true,
    title: '权倾天下',
    description: '权谋之术被你玩弄于股掌之间。即使无天子之命，你也能号令天下，莫敢不从。',
  },
  {
    id: 'ending-politics-low',
    category: 'normal',
    cause: 'politics',
    isHigh: false,
    title: '权术尽失',
    description: '你已众叛亲离，树倒猢狲散。曾经的心腹要么离你而去，要么成为你的敌人。',
  },
  {
    id: 'ending-military-high',
    category: 'normal',
    cause: 'military',
    isHigh: true,
    title: '兵马成势',
    description: '你的军队已成为当世最强。战无不胜，攻无不克，天下三分有其二。',
  },
  {
    id: 'ending-military-low',
    category: 'normal',
    cause: 'military',
    isHigh: false,
    title: '兵败如山',
    description: '你已无力再战。军队溃散，领地沦丧，曾经的霸业付诸东流。',
  },
  {
    id: 'ending-provisions-high',
    category: 'normal',
    cause: 'provisions',
    isHigh: true,
    title: '富甲天下',
    description: '粮仓充盈，国库充盈。你的实力让所有对手望尘莫及，经济即是战争。',
  },
  {
    id: 'ending-provisions-low',
    category: 'normal',
    cause: 'provisions',
    isHigh: false,
    title: '民穷财尽',
    description: '你的根基已彻底断裂。百姓流离，粮食耗尽，即便是再有雄心，也无力回天。',
  },
  {
    id: 'ending-caocao-victory',
    category: 'special',
    title: '魏武挥鞭',
    description: '你闭眼，耳畔传来司马懿的声音："魏王薨逝，天下震动。"回首这一生，你从一介校尉成长为魏王，奠定了曹魏基业。曹丕继位后废汉献帝，建立曹魏政权。你的霸业，终于完成。',
    character: '曹操',
    specialType: 'good',
  },
  {
    id: 'ending-caocao-legacy',
    category: 'special',
    title: '功过成败',
    description: '你闭眼，思绪回到起点。刺杀董卓时的决绝，十八路诸侯会盟时的雄心，官渡之战的惊险，赤壁失败的遗憾……这一生，你留下了无数传说。功过成败，就留待后人评说吧。',
    character: '曹操',
    specialType: 'good',
  },
  {
    id: 'ending-caocao-bad',
    category: 'special',
    title: '出师未捷',
    description: '刺杀失败，你被当场擒拿。身首异处，壮志未酬。',
    character: '曹操',
    specialType: 'bad',
  },
]

export function getEnding(cause: EndingCause, isHigh: boolean): Ending | undefined {
  return endings.find((e) => e.category === 'normal' && e.cause === cause && e.isHigh === isHigh)
}

export function getSpecialEnding(character: string, type: SpecialEndingType): Ending | undefined {
  return endings.find((e) => e.category === 'special' && e.character === character && e.specialType === type)
}

export function getSpecialEndingById(id: string): Ending | undefined {
  return endings.find((e) => e.id === id)
}