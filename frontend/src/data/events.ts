// export type GameStatKey = 'heaven' | 'politics' | 'military' | 'provisions'

// export interface StatEffect {
//   heaven?: number
//   politics?: number
//   military?: number
//   provisions?: number
// }

// export interface Choice {
//   direction: 'left' | 'right'
//   label: string
//   effects: StatEffect
// }

// export interface GameEvent {
//   id: string
//   character: string
//   faction?: string
//   description: string
//   choices: [Choice, Choice]
//   nextCardId?: string
//   leader?: 'cao-cao' | 'liu-bei' | 'sun-quan'
// }

// export const events: GameEvent[] = [
//   {
//     id: 'event-000',
//     character: '袁绍',
//     faction: '北方霸主',
//     description: '董卓废帝专权，天下共愤。袁绍以渤海太守之名，广发英雄帖，召集十八路诸侯共讨董卓。诸侯联军已在陈留会盟，阁下可愿前往？',
//     choices: [
//       { direction: 'left', label: '静观其变', effects: { heaven: -5, provisions: 10 } },
//       { direction: 'right', label: '前往会盟', effects: { military: 10, provisions: -5 } },
//     ],
//   },
//   {
//     id: 'event-001',
//     character: '邢道荣',
//     faction: '零陵上将',
//     description: '前方出现一员大将！只见他手持梨花开山斧，骑着战马而来，大喝："说出吾名，吓汝一跳！我乃是零陵上将军，邢道荣！"',
//     choices: [
//       { direction: 'left', label: '撤退', effects: { military: -10, provisions: 5 } },
//       { direction: 'right', label: '迎战', effects: { military: 15, heaven: 5 } },
//     ],
//   },
//   {
//     id: 'event-002',
//     character: '公孙瓒',
//     faction: '北平太守',
//     description: '公孙瓒看着袁绍和袁术两兄弟，摇头道："这对堂兄弟，可谓是一对笑面虎，两头乌角鲨啊！"',
//     choices: [
//       { direction: 'left', label: '附和公孙瓒', effects: { heaven: 5, politics: 5 } },
//       { direction: 'right', label: '中立观望', effects: { provisions: 5, military: 0 } },
//     ],
//   },
//   {
//     id: 'event-003',
//     character: '许褚',
//     faction: '虎痴',
//     description: '许褚手持大刀挡在路口，大喝一声："You fool! 想要从此路过，先問問我的手裡的刀！"',
//     choices: [
//       { direction: 'left', label: '好言相劝', effects: { politics: 10, provisions: -5 } },
//       { direction: 'right', label: '强行突破', effects: { military: 15, heaven: -5 } },
//     ],
//   },
//   {
//     id: 'event-004',
//     character: '董卓',
//     faction: '相国',
//     description: '董卓在洛阳郊外的山林中设下埋伏。火光冲天，喊杀声四起。原来是董卓的西凉军！',
//     choices: [
//       { direction: 'left', label: '正面突围', effects: { military: 20, heaven: -10 } },
//       { direction: 'right', label: '绕道而行', effects: { provisions: 10, military: -5 } },
//     ],
//   },
//   {
//     id: 'event-005',
//     character: '荀彧',
//     faction: '王佐之才',
//     description: '荀彧手持书卷缓缓走来："明公欲成霸业，需以人为本。天下百姓苦董卓久矣，当以仁义取天下。"',
//     choices: [
//       { direction: 'left', label: '采纳建议', effects: { heaven: 15, politics: 10 } },
//       { direction: 'right', label: '婉言谢绝', effects: { military: 5, provisions: 5 } },
//     ],
//   },
//   {
//     id: 'event-006',
//     character: '陶谦',
//     faction: '徐州牧',
//     description: '陶谦抚须笑道："玄德公若是愿意接管徐州，我这把老骨头也可安心归隐了。"',
//     choices: [
//       { direction: 'left', label: '接受徐州', effects: { provisions: 20, politics: 10 } },
//       { direction: 'right', label: '婉拒好意', effects: { heaven: 10, military: 5 } },
//     ],
//   },
//   {
//     id: 'event-007',
//     character: '关羽',
//     faction: '汉寿亭侯',
//     description: '关羽手提青龙偃月刀，骑着赤兔马而来："兄长莫慌，关羽来也！"',
//     choices: [
//       { direction: 'left', label: '并肩作战', effects: { military: 20, heaven: 10 } },
//       { direction: 'right', label: '防守为主', effects: { provisions: 10, military: 5 } },
//     ],
//   },
//   {
//     id: 'event-008',
//     character: '张飞',
//     faction: '燕人',
//     description: '张飞怒目圆睁："哇呀呀！谁敢与我燕人张翼德一战！"声如巨雷，震耳欲聋。',
//     choices: [
//       { direction: 'left', label: '安抚情绪', effects: { politics: 10, heaven: 5 } },
//       { direction: 'right', label: '让其出战', effects: { military: 15, provisions: -5 } },
//     ],
//   },
//   {
//     id: 'event-009',
//     character: '诸葛亮',
//     faction: '卧龙',
//     description: '卧龙岗上，诸葛亮羽扇纶巾："在下隆中对策，愿为明公三分天下。"',
//     choices: [
//       { direction: 'left', label: '请求出山', effects: { heaven: 20, politics: 15 } },
//       { direction: 'right', label: '日后再请', effects: { provisions: 10, military: 5 } },
//     ],
//   },
//   {
//     id: 'event-010',
//     character: '鲁肃',
//     faction: '江东口舌',
//     description: '鲁肃笑道："曹公挟天子以令诸侯，刘备汉室宗亲，孙吴江东基业。三分天下，方能鼎立。"',
//     choices: [
//       { direction: 'left', label: '赞同分析', effects: { heaven: 10, politics: 10 } },
//       { direction: 'right', label: '另有高见', effects: { military: 5, provisions: 10 } },
//     ],
//   },
//   {
//     id: 'event-011',
//     character: '孙坚',
//     faction: '江东猛虎',
//     description: '孙坚率部渡过长江："传国玉玺已在手中，此乃天命所归！"',
//     choices: [
//       { direction: 'left', label: '保护玉玺', effects: { heaven: 15, military: 10 } },
//       { direction: 'right', label: '不予理会', effects: { provisions: 10, politics: 5 } },
//     ],
//   },
//   {
//     id: 'event-012',
//     character: '周瑜',
//     faction: '江夏太守',
//     description: '周瑜轻摇羽扇："操贼虽众，远道而来，必疲惫不堪。此乃天救曹贼也！"',
//     choices: [
//       { direction: 'left', label: '采纳火攻', effects: { military: 25, heaven: 10 } },
//       { direction: 'right', label: '稳扎稳打', effects: { provisions: 15, military: 5 } },
//     ],
//   },
//   {
//     id: 'event-013',
//     character: '张昭',
//     faction: '江东二相',
//     description: '张昭摇头道："主公若降曹，则江东六郡八十一州尽归曹操。降不得啊！"',
//     choices: [
//       { direction: 'left', label: '主战到底', effects: { military: 15, heaven: 10 } },
//       { direction: 'right', label: '暂避锋芒', effects: { provisions: 20, politics: -5 } },
//     ],
//   },
//   {
//     id: 'event-014',
//     character: '汉献帝',
//     faction: '大汉天子',
//     description: '献帝拉着刘备的手泣道："皇叔救我！董卓欺君罔上，曹操又虎视眈眈，朕危在旦夕！"',
//     choices: [
//       { direction: 'left', label: '起兵勤王', effects: { heaven: 20, military: 10 } },
//       { direction: 'right', label: '保护陛下', effects: { provisions: 15, politics: 10 } },
//     ],
//   },
//   {
//     id: 'event-015',
//     character: '匈奴单于',
//     faction: '南匈奴',
//     description: '匈奴单于率军南下："中原大乱，正是我等南下牧马之时！"',
//     choices: [
//       { direction: 'left', label: '联合抗敌', effects: { military: 15, provisions: -10 } },
//       { direction: 'right', label: '击退匈奴', effects: { heaven: 15, military: 10 } },
//     ],
//   },
//   {
//     id: 'event-016',
//     character: '商贾',
//     faction: '商贾',
//     description: '一队商贾路过："将军若是缺粮，我等愿以低价售之。不过这年头，粮食可得涨涨价了。"',
//     choices: [
//       { direction: 'left', label: '��买粮食', effects: { provisions: 20, politics: -5 } },
//       { direction: 'right', label: '拒绝交易', effects: { military: 5, heaven: 5 } },
//     ],
//   },
//   {
//     id: 'event-017',
//     character: '儒生',
//     faction: '儒生',
//     description: '一群儒生议论纷纷："刘备乃中山靖王之后，果然仁德无双！""曹操挟持天子，实乃汉贼！"',
//     choices: [
//       { direction: 'left', label: '礼贤下士', effects: { heaven: 10, politics: 15 } },
//       { direction: 'right', label: '不予理会', effects: { provisions: 5, military: 5 } },
//     ],
//   },
//   {
//     id: 'event-018',
//     character: '山贼',
//     faction: '山贼',
//     description: '一伙山贼拦路抢劫："此路是我开，此树是我栽，要打此路过，留下买路财！"',
//     choices: [
//       { direction: 'left', label: '支付买路财', effects: { provisions: -10, military: 5 } },
//       { direction: 'right', label: '消灭山贼', effects: { military: 15, heaven: 10 } },
//     ],
//   },
//   {
//     id: 'event-019',
//     character: '黄巾余党',
//     faction: '黄巾',
//     description: '黄巾余党死灰复燃，再次啸聚山林："苍天已死，黄天当立，岁在甲子，天下大吉！"',
//     choices: [
//       { direction: 'left', label: '安抚收编', effects: { provisions: 10, military: -5 } },
//       { direction: 'right', label: '镇压叛乱', effects: { military: 15, heaven: 10 } },
//     ],
//   },
//   {
//     id: 'event-020',
//     character: '袁术',
//     faction: '仲家皇帝',
//     description: '袁术称帝了！"我得玉玺，天命所归！今日便是仲家皇帝登基之时！"',
//     choices: [
//       { direction: 'left', label: '劝阻称帝', effects: { heaven: -5, politics: 10 } },
//       { direction: 'right', label: '自立为帝', effects: { heaven: -20, military: 15 } },
//     ],
//   },
//   {
//     id: 'event-021',
//     character: '貂蝉',
//     faction: '司徒',
//     description: '貂蝉哭泣道："义父王允大人死于非命，董卓老贼欺人太甚！"',
//     choices: [
//       { direction: 'left', label: '同情遭遇', effects: { heaven: 10, provisions: -5 } },
//       { direction: 'right', label: '图谋除贼', effects: { military: 10, politics: 10 } },
//     ],
//   },
//   {
//     id: 'event-022',
//     character: '吕布',
//     faction: '温侯',
//     description: '吕布手持方天画戟，骑着赤兔马："吾丁原董卓皆可杀之，况汝等乎！"',
//     choices: [
//       { direction: 'left', label: '招降吕布', effects: { military: 20, heaven: -5 } },
//       { direction: 'right', label: '联盟抗吕', effects: { heaven: 10, military: 10 } },
//     ],
//   },
//   {
//     id: 'event-023',
//     character: '华雄',
//     faction: '都督',
//     description: '华雄挡住去路："关上将领，哪个敢来送死！"连续斩落数员大将。',
//     choices: [
//       { direction: 'left', label: '激将法的', effects: { heaven: 5, military: 10 } },
//       { direction: 'right', label: '车轮战', effects: { military: 15, provisions: -10 } },
//     ],
//   },
//   {
//     id: 'event-024',
//     character: '曹操',
//     faction: '曹孟德',
//     description: '曹操笑迎刘备："今天下英雄，唯使君与操耳！"',
//     choices: [
//       { direction: 'left', label: '谦虚回应', effects: { politics: 10, heaven: 5 } },
//       { direction: 'right', label: '虚与委蛇', effects: { provisions: 10, military: 5 } },
//     ],
//   },
//   {
//     id: 'event-025',
//     character: '孙策',
//     faction: '江东小霸王',
//     description: '孙策手提古锭刀："父亲之仇，誓要上报！刘表拿命来！"',
//     choices: [
//       { direction: 'left', label: '支持复仇', effects: { military: 15, heaven: 10 } },
//       { direction: 'right', label: '劝其冷静', effects: { provisions: 10, politics: 5 } },
//     ],
//   },
//   {
//     id: 'event-026',
//     character: '刘表',
//     faction: '荆州牧',
//     description: '刘表病重卧床："吾儿刘琦刘琮皆不成器，这荆州基业该如何是好？"',
//     choices: [
//       { direction: 'left', label: '辅助少主', effects: { heaven: 10, provisions: 10 } },
//       { direction: 'right', label: '取而代之', effects: { military: 20, heaven: -10 } },
//     ],
//   },
//   {
//     id: 'event-027',
//     character: '刘璋',
//     faction: '益州牧',
//     description: '刘璋性格暗弱："汉中有张鲁虎视眈眈，葭萌关霍峻告急，这如何是好？"',
//     choices: [
//       { direction: 'left', label: '请求援军', effects: { military: 10, provisions: 10 } },
//       { direction: 'right', label: '坐视不管', effects: { provisions: 15, heaven: -5 } },
//     ],
//   },
//   {
//     id: 'event-028',
//     character: '张鲁',
//     faction: '天师',
//     description: '张鲁在汉中传播五斗米道："入道者，皆可免租税三年。百姓纷纷归附。"',
//     choices: [
//       { direction: 'left', label: '支持道教', effects: { heaven: 15, provisions: 10 } },
//       { direction: 'right', label: '反对邪教', effects: { military: 10, politics: 5 } },
//     ],
//   },
//   {
//     id: 'event-029',
//     character: '马超',
//     faction: '锦马超',
//     description: '西凉铁骑来势汹汹，马超银甲白马："曹操勾结韩遂，骗我父亲，我与他不共戴天！"',
//     choices: [
//       { direction: 'left', label: '联合抗曹', effects: { military: 20, heaven: 10 } },
//       { direction: 'right', label: '隔岸观火', effects: { provisions: 15, military: 5 } },
//     ],
//   },
//   {
//     id: 'event-030',
//     character: '赵云',
//     faction: '常山赵子龙',
//     description: '赵云七进七出，救出阿斗："主公快走！末将断后！"',
//     choices: [
//       { direction: 'left', label: '突围而去', effects: { military: 15, provisions: 10 } },
//       { direction: 'right', label: '返回接应', effects: { heaven: 20, military: -5 } },
//     ],
//   },
// ]

// export function getEventById(id: string): GameEvent | undefined {
//   return events.find(e => e.id === id)
// }

// export function getFirstEventId(): string {
//   return events[0]?.id || 'event-000'
// }

// export const CHARACTER_COLORS: Record<string, { bg: string; accent: string; emblem: string; image?: string }> = {
//   '董卓': { bg: '#1a1515', accent: '#8b3a3a', emblem: '董' },
//   '袁绍': { bg: '#1B1B1B', accent: '#909090', emblem: '袁', image: '/img/yuanshao.png' },
//   '荀彧': { bg: '#151a20', accent: '#4a6f8b', emblem: '荀' },
//   '关羽': { bg: '#151515', accent: '#8b4a4a', emblem: '羽' },
//   '陶谦': { bg: '#1a1a15', accent: '#8b7a4a', emblem: '陶' },
//   '诸葛亮': { bg: '#151a1a', accent: '#4a8b6f', emblem: '葛' },
//   '孙坚': { bg: '#151a1a', accent: '#4a6f8b', emblem: '孫' },
//   '周瑜': { bg: '#1a151a', accent: '#8b4a6f', emblem: '周' },
//   '张昭': { bg: '#1a1a15', accent: '#6f8b4a', emblem: '張' },
//   '汉献帝': { bg: '#151515', accent: '#d2b270', emblem: '漢' },
//   '匈奴单于': { bg: '#1a1515', accent: '#8b6f4a', emblem: '奴' },
//   '商贾': { bg: '#151a15', accent: '#6f8b4a', emblem: '商' },
//   '儒生': { bg: '#151515', accent: '#4a8b8b', emblem: '儒' },
//   '山贼': { bg: '#151515', accent: '#6f4a4a', emblem: '寇' },
//   '黄巾余党': { bg: '#1a1515', accent: '#8b7a3a', emblem: '黃' },
// }

// export function getCharacterVisual(character: string): { bg: string; accent: string; emblem: string; image?: string } {
//   return CHARACTER_COLORS[character] || { bg: '#151520', accent: '#6f6f8b', emblem: character[0] }
// }