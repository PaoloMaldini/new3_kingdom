import type { Location } from './types'

export const locations: Location[] = [
  {
    id: 'xuchang',
    name: '许昌',
    type: 'capital',
    coordinates: { x: 65, y: 45 },
    description: '曹操的根据地与政治中心，挟天子以令诸侯的起点',
    historicalSignificance: '东汉末年，曹操迎汉献帝迁都于此，使其成为实际上的东汉中心',
    associatedLeaders: ['曹操', '荀彧', '司马懿'],
    color: '#6f8fd8',
    events: [
      {
        id: 'xuchang-1',
        title: '挟天子以令诸侯',
        year: 196,
        description: '曹操迎汉献帝至许昌，开始了真正的权臣之路。你将扮演曹操，面对这一重大抉择',
        protagonist: '曹操',
        protagonistRole: '权倾朝野的枭雄',
        choices: [
          {
            direction: 'left',
            label: '恭迎圣驾，以臣事君',
            effects: { heaven: 3, politics: 2, military: 1, provisions: 1 },
          },
          {
            direction: 'right',
            label: '名为辅政，实揽大权',
            effects: { heaven: 1, politics: 3, military: 2, provisions: 1 },
          },
        ],
      },
      {
        id: 'xuchang-2',
        title: '铜雀台建成',
        year: 210,
        description: '铜雀台巍峨耸立，文武百官齐聚庆贺',
        protagonist: '曹操',
        protagonistRole: '铜雀台之主',
        choices: [
          {
            direction: 'left',
            label: '宴请群臣，展示实力',
            effects: { politics: 2, military: 1, provisions: -1 },
          },
          {
            direction: 'right',
            label: '私下会见谋士，商议大计',
            effects: { politics: 3, heaven: 1, provisions: -1 },
          },
        ],
      },
    ],
  },
  {
    id: 'luoyang',
    name: '洛阳',
    type: 'capital',
    coordinates: { x: 70, y: 35 },
    description: '东汉都城，千年帝都，见证王朝兴衰',
    historicalSignificance: '东汉末年洛阳经历董卓之乱、李傕郭汜之乱，最终在曹操迎帝后逐渐恢复',
    associatedLeaders: ['董卓', '袁绍', '汉献帝'],
    color: '#c95f56',
    events: [
      {
        id: 'luoyang-1',
        title: '董卓进京',
        year: 189,
        description: '董卓率西凉铁骑进入洛阳，废少帝立献帝，一时权倾天下',
        protagonist: '董卓',
        protagonistRole: '西凉军阀',
        choices: [
          {
            direction: 'left',
            label: '废立皇帝，独揽大权',
            effects: { heaven: -2, politics: 3, military: 2, provisions: 1 },
          },
          {
            direction: 'right',
            label: '扶持汉室，暗中掌权',
            effects: { heaven: 1, politics: 2, military: 1, provisions: 1 },
          },
        ],
      },
      {
        id: 'luoyang-2',
        title: '十八路诸侯讨董',
        year: 190,
        description: '关东联军推袁绍为盟主，共同讨伐董卓',
        protagonist: '袁绍',
        protagonistRole: '联军盟主',
        choices: [
          {
            direction: 'left',
            label: '率军直捣黄龙',
            effects: { military: 3, politics: 1, provisions: -2 },
          },
          {
            direction: 'right',
            label: '按兵不动，静观其变',
            effects: { politics: 2, military: 1, provisions: 1, heaven: -1 },
          },
        ],
      },
    ],
  },
  {
    id: 'jingzhou',
    name: '荆州',
    type: 'strategic',
    coordinates: { x: 50, y: 50 },
    description: '兵家必争之地，北拒曹操，东连孙权，西通巴蜀',
    historicalSignificance: '荆州地理位置极其重要，是三国争夺的焦点，刘备借荆州、关羽失荆州皆发生于此',
    associatedLeaders: ['刘备', '关羽', '孙权', '周瑜'],
    color: '#FACD05',
    events: [
      {
        id: 'jingzhou-1',
        title: '三顾茅庐',
        year: 207,
        description: '刘备三请诸葛亮，卧龙出山',
        protagonist: '刘备',
        protagonistRole: '求贤若渴的皇叔',
        choices: [
          {
            direction: 'left',
            label: '诚心相邀，共图大业',
            effects: { heaven: 3, politics: 3, military: 1, provisions: 0 },
          },
          {
            direction: 'right',
            label: '以情动人，许以重用',
            effects: { heaven: 2, politics: 2, military: 2, provisions: 0 },
          },
        ],
      },
      {
        id: 'jingzhou-2',
        title: '借荆州',
        year: 209,
        description: '赤壁之战后，刘备向孙权借荆州作为立足之地',
        protagonist: '刘备',
        protagonistRole: '暂借荆州的枭雄',
        choices: [
          {
            direction: 'left',
            label: '承诺日后归还，取信东吴',
            effects: { heaven: 2, politics: 2, provisions: 1 },
          },
          {
            direction: 'right',
            label: '据理力争，永占荆州',
            effects: { politics: 3, military: 1, heaven: -1 },
          },
        ],
      },
    ],
  },
  {
    id: 'chengdu',
    name: '成都',
    type: 'capital',
    coordinates: { x: 30, y: 55 },
    description: '天府之国，蜀汉都城，刘备称帝之地',
    historicalSignificance: '公元221年刘备在成都称帝，建立蜀汉政权，与曹魏、东吴三分天下',
    associatedLeaders: ['刘备', '诸葛亮', '刘禅'],
    color: '#ACD86F',
    events: [
      {
        id: 'chengdu-1',
        title: '刘备称帝',
        year: 221,
        description: '曹丕篡汉后，刘备在成都继皇帝位，延续汉室正统',
        protagonist: '刘备',
        protagonistRole: '蜀汉开国皇帝',
        choices: [
          {
            direction: 'left',
            label: '登基大典，光复汉室',
            effects: { heaven: 3, politics: 3, military: 1, provisions: 0 },
          },
          {
            direction: 'right',
            label: '励精图治，积蓄实力',
            effects: { politics: 2, military: 2, provisions: 2, heaven: 1 },
          },
        ],
      },
      {
        id: 'chengdu-2',
        title: '白帝城托孤',
        year: 223,
        description: '刘备病重，将刘禅托付给诸葛亮',
        protagonist: '刘备',
        protagonistRole: '蜀汉先帝',
        choices: [
          {
            direction: 'left',
            label: '嘱托诸葛亮全权辅政',
            effects: { heaven: 2, politics: 3, military: 0, provisions: 0 },
          },
          {
            direction: 'right',
            label: '暗中布置，平衡权力',
            effects: { politics: 2, military: 1, heaven: 1, provisions: 0 },
          },
        ],
      },
    ],
  },
  {
    id: 'jianye',
    name: '建业',
    type: 'capital',
    coordinates: { x: 75, y: 60 },
    description: '江东之都，孙权建立东吴的根据地',
    historicalSignificance: '孙权在江东建立基业，后迁都建业，成为东吴的政治中心',
    associatedLeaders: ['孙坚', '孙策', '孙权', '周瑜'],
    color: '#ACD86F',
    events: [
      {
        id: 'jianye-1',
        title: '孙权继位',
        year: 200,
        description: '孙策遇刺身亡，孙权继位承父兄基业',
        protagonist: '孙权',
        protagonistRole: '年轻的江东之主',
        choices: [
          {
            direction: 'left',
            label: '重用旧臣，稳定局势',
            effects: { politics: 3, military: 1, heaven: 1, provisions: 0 },
          },
          {
            direction: 'right',
            label: '招贤纳士，扩大势力',
            effects: { military: 2, politics: 2, heaven: 0, provisions: -1 },
          },
        ],
      },
      {
        id: 'jianye-2',
        title: '建立东吴',
        year: 229,
        description: '孙权正式称帝，建立东吴政权',
        protagonist: '孙权',
        protagonistRole: '东吴开国皇帝',
        choices: [
          {
            direction: 'left',
            label: '定都建业，励精图治',
            effects: { heaven: 2, politics: 3, military: 1, provisions: 1 },
          },
          {
            direction: 'right',
            label: '加强水军，巩固江防',
            effects: { military: 3, politics: 1, provisions: 1, heaven: 1 },
          },
        ],
      },
    ],
  },
  {
    id: 'hulaoguan',
    name: '虎牢关',
    type: 'battlefield',
    coordinates: { x: 72, y: 38 },
    description: '洛阳东部门户，天下第一关，三英战吕布之地',
    historicalSignificance: '虎牢关是洛阳的重要屏障，吕布在此连胜诸侯大将，后被刘关张三兄弟击败',
    associatedLeaders: ['吕布', '刘备', '关羽', '张飞', '董卓'],
    color: '#c95f56',
    events: [
      {
        id: 'hulaoguan-1',
        title: '吕布叫阵',
        year: 190,
        description: '吕布在虎牢关前挑战诸侯，无人能敌',
        protagonist: '吕布',
        protagonistRole: '天下第一猛将',
        choices: [
          {
            direction: 'left',
            label: '连挑数将，威震诸侯',
            effects: { military: 3, politics: 1, heaven: -1, provisions: 0 },
          },
          {
            direction: 'right',
            label: '养精蓄锐，以逸待劳',
            effects: { military: 2, provisions: 1, heaven: 1, politics: 0 },
          },
        ],
      },
      {
        id: 'hulaoguan-2',
        title: '三英战吕布',
        year: 190,
        description: '刘备关羽张飞三兄弟联手对战吕布',
        protagonist: '刘备',
        protagonistRole: '并肩作战的兄弟',
        choices: [
          {
            direction: 'left',
            label: '与兄弟合力击退吕布',
            effects: { military: 3, heaven: 2, politics: 1, provisions: -1 },
          },
          {
            direction: 'right',
            label: '保存实力，见好就收',
            effects: { military: 1, politics: 2, provisions: 1, heaven: 0 },
          },
        ],
      },
    ],
  },
  {
    id: 'chibi',
    name: '赤壁',
    type: 'battlefield',
    coordinates: { x: 60, y: 55 },
    description: '长江要隘，三国最著名战场，孙刘联军大破曹军',
    historicalSignificance: '公元208年周瑜火烧赤壁，以少胜多大败曹操，奠定三国鼎立基础',
    associatedLeaders: ['曹操', '周瑜', '刘备', '诸葛亮', '孙权'],
    color: '#6f8fd8',
    events: [
      {
        id: 'chibi-1',
        title: '曹操挥师南下',
        year: 208,
        description: '曹操率八十万大军南征，意图一统天下',
        protagonist: '曹操',
        protagonistRole: '志在一统的霸主',
        choices: [
          {
            direction: 'left',
            label: '水路并进，直取江东',
            effects: { military: 3, provisions: 2, heaven: -1, politics: 0 },
          },
          {
            direction: 'right',
            label: '稳扎稳打，先取荆州',
            effects: { military: 2, provisions: 1, heaven: 1, politics: 1 },
          },
        ],
      },
      {
        id: 'chibi-2',
        title: '火烧赤壁',
        year: 208,
        description: '周瑜黄盖设计火攻，大破曹军',
        protagonist: '周瑜',
        protagonistRole: '东吴大都督',
        choices: [
          {
            direction: 'left',
            label: '使用火攻，一举破敌',
            effects: { military: 3, heaven: 2, provisions: -1, politics: 1 },
          },
          {
            direction: 'right',
            label: '水陆夹击，步步为营',
            effects: { military: 2, provisions: 1, heaven: 1, politics: 2 },
          },
        ],
      },
    ],
  },
  {
    id: 'changbanpo',
    name: '长坂坡',
    type: 'battlefield',
    coordinates: { x: 55, y: 48 },
    description: '赵云单骑救主，张飞喝断当阳桥',
    historicalSignificance: '曹操追击刘备，赵云于长坂坡七进七出救出阿斗，张飞据水断桥阻挡曹军',
    associatedLeaders: ['刘备', '赵云', '张飞', '曹操'],
    color: '#FACD05',
    events: [
      {
        id: 'changbanpo-1',
        title: '赵云救主',
        year: 208,
        description: '刘备败走，赵云单骑冲入曹军寻找刘备家眷',
        protagonist: '赵云',
        protagonistRole: '单骑救主的虎威将军',
        choices: [
          {
            direction: 'left',
            label: '不顾一切，直闯敌阵',
            effects: { military: 3, heaven: 2, provisions: -1, politics: 0 },
          },
          {
            direction: 'right',
            label: '智勇双全，巧计突围',
            effects: { military: 2, heaven: 3, provisions: 0, politics: 1 },
          },
        ],
      },
      {
        id: 'changbanpo-2',
        title: '张飞喝断当阳桥',
        year: 208,
        description: '张飞率二十骑在当阳桥断后，一声怒吼吓退曹军',
        protagonist: '张飞',
        protagonistRole: '喝断当阳桥的猛将',
        choices: [
          {
            direction: 'left',
            label: '大喝一声，吓退曹兵',
            effects: { military: 3, heaven: 2, provisions: 0, politics: 0 },
          },
          {
            direction: 'right',
            label: '虚张声势，拖延时间',
            effects: { military: 2, provisions: 1, heaven: 1, politics: 1 },
          },
        ],
      },
    ],
  },
  {
    id: 'maicheng',
    name: '麦城',
    type: 'battlefield',
    coordinates: { x: 45, y: 52 },
    description: '关羽败走麦城，英雄末路的悲壮之地',
    historicalSignificance: '公元220年，关羽败走麦城，被东吴擒杀，一代武圣陨落',
    associatedLeaders: ['关羽', '孙权', '吕蒙', '陆逊'],
    color: '#FACD05',
    events: [
      {
        id: 'maicheng-1',
        title: '败走麦城',
        year: 220,
        description: '关羽腹背受敌，败走麦城，陷入绝境',
        protagonist: '关羽',
        protagonistRole: '败走麦城的武圣',
        choices: [
          {
            direction: 'left',
            label: '宁死不降，以身殉节',
            effects: { heaven: 3, military: 0, provisions: 0, politics: 0 },
          },
          {
            direction: 'right',
            label: '暂避锋芒，等待救援',
            effects: { military: 1, heaven: 1, provisions: 1, politics: 1 },
          },
        ],
      },
      {
        id: 'maicheng-2',
        title: '最后的抉择',
        year: 220,
        description: '关羽被围，面对生与死的抉择',
        protagonist: '关羽',
        protagonistRole: '被困的蜀汉名将',
        choices: [
          {
            direction: 'left',
            label: '誓死不屈，杀身成仁',
            effects: { heaven: 3, military: 0, provisions: 0, politics: 0 },
          },
          {
            direction: 'right',
            label: '假意归降，伺机而动',
            effects: { heaven: -2, military: 1, provisions: 1, politics: 2 },
          },
        ],
      },
    ],
  },
]

export function getLocationById(id: string): Location | undefined {
  return locations.find(location => location.id === id)
}

export function getLocationsByType(type: string): Location[] {
  return locations.filter(location => location.type === type)
}
