import type { TimelineEvent, SideEvent, StatEffect } from '../types'

function se(effects: StatEffect): StatEffect {
  return effects
}

export const caoCaoTimeline: TimelineEvent[] = [
  {
    id: 'cc-tl-001',
    type: 'timeline',
    year: 189,
    character: '董卓',
    faction: '相国',
    description: '董卓问："孟德为何姗姗来迟？"你答："马走不快，故而迟到。"董卓躺下，吕布在旁。你抽出七星宝刀，正要行刺——董卓忽然翻身！',
    choices: [
      { direction: 'left', label: '掷刀而逃', effects: se({ heaven: -5, politics: 3 }), nextTimelineId: 'cc-tl-002' },
      { direction: 'right', label: '拼死一搏', effects: se({ heaven: 0, military: 0 }), nextTimelineId: 'cc-tl-bad-end' },
    ],
  },
  {
    id: 'cc-tl-002',
    type: 'timeline',
    year: 189,
    character: '陈宫',
    faction: '中牟县令',
    description: '你被押至县衙，陈宫问："你就是行刺董卓的曹操？"他盯着你看了半晌："董卓捕你，赏金千金。你倒有种。我若押你进京，便是泼天的富贵。但我敬佩你是条好汉。"',
    choices: [
      { direction: 'left', label: '公台兄，愿与我同往？', effects: se({ politics: 5, provisions: 3 }), nextTimelineId: 'cc-side-001' },
      { direction: 'right', label: '多谢壮士，容我独自离去', effects: se({ heaven: 2, provisions: -3 }), nextTimelineId: 'cc-tl-003' },
    ],
  },
  {
    id: 'cc-tl-003',
    type: 'timeline',
    year: 191,
    character: '袁绍',
    faction: '盟主',
    description: '袁绍问："操，何故带此人来？"你答："此人是汉室宗亲，姓刘名备，与我一见如故。"袁绍不屑："织席贩履之辈，也敢来此？"诸侯哄堂大笑。',
    choices: [
      { direction: 'left', label: '此人胸怀天下，非等闲之辈', effects: se({ politics: 8, heaven: 3 }), nextTimelineId: 'cc-tl-004' },
      { direction: 'right', label: '倒也不是我带来的', effects: se({ provisions: 5, politics: -5 }), nextTimelineId: 'cc-tl-004' },
    ],
  },
  {
    id: 'cc-tl-004',
    type: 'timeline',
    year: 191,
    character: '孙坚',
    faction: '江东之主',
    description: '孙坚握着你的手："孟德，我盼你简直望眼欲穿！你星夜追击董卓，不料在荥阳遭遇吕布伏击，折了过半兵马。你我皆国家栋梁，应当惺惺相惜。"',
    choices: [
      { direction: 'left', label: '借兵四千，星夜再追', effects: se({ military: 10, provisions: -5, politics: -3 }), nextTimelineId: 'cc-tl-005' },
      { direction: 'right', label: '孙将军，不如与我共掌天下', effects: se({ politics: 8, heaven: 5 }), nextTimelineId: 'cc-tl-005' },
    ],
  },
  {
    id: 'cc-tl-005',
    type: 'timeline',
    year: 193,
    character: '曹嵩',
    faction: '父亲',
    description: '曹嵩变卖家产："孟德，父亲为你凑了两万五千金。这是你曹家的全部家底。十坛沛国佳酿，每坛价值百金，你带去打点诸侯。"',
    choices: [
      { direction: 'left', label: '父亲放心，儿必成就大业', effects: se({ heaven: 8, provisions: 15 }), nextTimelineId: 'cc-tl-006' },
      { direction: 'right', label: '父亲速往琅琊躲避', effects: se({ politics: 5, provisions: 10 }), nextTimelineId: 'cc-tl-006' },
    ],
  },
  {
    id: 'cc-tl-006',
    type: 'timeline',
    year: 193,
    character: '荀彧',
    faction: '荀令君',
    description: '曹嵩途径徐州，被张闿杀害。荀彧："在下一者为主公担忧，二者为主公道喜。"',
    choices: [
      { direction: 'left', label: '大军五万，星夜攻伐徐州。', effects: se({politics:5, heaven: 10, provisions: 10,military:-10 }), nextTimelineId: 'cc-side-002' },
      { direction: 'right', label: '张闿才是祸首，率兵攻打五凤山', effects: se({ provisions: -5, politics: -5, heaven: -5,military:-15}), nextTimelineId: 'cc-tl-007' },
    ],
  },
  {
    id: 'cc-tl-007',
    type: 'timeline',
    year: 195,
    character: '汉献帝',
    faction: '天子',
    description: '汉献帝泪流满面："曹操，朕自长安逃回洛阳，颠沛流离，食不果腹。董卓、李傕、郭汜轮流凌辱朕。卿若能救驾，朕愿以江山为报！"',
    choices: [
      { direction: 'left', label: '陛下放心，臣必躬尽死力', effects: se({ heaven: 10, politics: 8 }), nextTimelineId: 'cc-side-003' },
      { direction: 'right', label: '陛下不如随臣前往许昌', effects: se({ politics: 12, military: 5, heaven: -3 }), nextTimelineId: 'cc-side-003' },
    ],
  },
  {
    id: 'cc-tl-008',
    type: 'timeline',
    year: 197,
    character: '袁术',
    faction: '仲氏皇帝',
    description: '探子来报："主公！袁术在寿春称帝了！国号仲氏！"你大笑："哈哈哈哈！袁公路竟敢称帝！自立为皇，此乃天数将亡！"',
    choices: [
      { direction: 'left', label: '立刻发兵征讨', effects: se({ military: 10, provisions: -10, heaven: 5 }), nextTimelineId: 'cc-tl-009' },
      { direction: 'right', label: '传檄天下，共讨逆贼', effects: se({ military: 8, provisions: -5, politics: 5 }), nextTimelineId: 'cc-tl-009' },
    ],
  },
  {
    id: 'cc-tl-009',
    type: 'timeline',
    year: 198,
    character: '刘备',
    faction: '徐州牧',
    description: '刘备叹气："吕布夺我徐州，我无路可去。"你握住他的手："玄德！我与你曾在十八路诸侯会盟时相识，彼时我就看出你是英雄。你我何不共创大业？"',
    choices: [
      { direction: 'left', label: '留下共事', effects: se({ politics: 10, provisions: -5, heaven: 3 }), nextTimelineId: 'cc-side-004' },
      { direction: 'right', label: '借兵给他取徐州', effects: se({ military: 8, provisions: 5, politics: -5 }), nextTimelineId: 'cc-side-004' },
    ],
  },
  {
    id: 'cc-tl-010',
    type: 'timeline',
    year: 199,
    character: '许攸',
    faction: '袁绍谋士',
    description: '许攸深夜来访："曹公！我乃袁绍谋士许攸！他有眼无珠，不纳我言！他的粮草尽在乌巢，若烧之，袁军必乱！"',
    choices: [
      { direction: 'left', label: '妙计！亲率精兵夜袭乌巢', effects: se({ provisions: -15, military: 15, politics: 10 }), nextTimelineId: 'cc-tl-011' },
      { direction: 'right', label: '你深夜来降，其中可有诈？', effects: se({ heaven: 3, provisions: -5 }), nextTimelineId: 'cc-tl-011' },
    ],
  },
  {
    id: 'cc-tl-011',
    type: 'timeline',
    year: 200,
    character: '张郃',
    faction: '袁绍部将',
    description: '张郃、高览率部来降："曹公！袁绍要用急就章对付我们，我们不愿送死！情愿归顺明公！"',
    choices: [
      { direction: 'left', label: '二位将军来得正好！', effects: se({ military: 15, politics: 8 }), nextTimelineId: 'cc-tl-012' },
      { direction: 'right', label: '先缴械，观察数日', effects: se({ military: 5, heaven: 5 }), nextTimelineId: 'cc-tl-012' },
    ],
  },
  {
    id: 'cc-tl-012',
    type: 'timeline',
    year: 200,
    character: '袁绍',
    faction: '冀州牧',
    description: '你率军追击，袁绍兵败如山倒。袁绍仰天哭道："我南守官渡，北守白马！如今竟一夜尽失！天亡我也！"吐血数升。',
    choices: [
      { direction: 'left', label: '斩草除根！', effects: se({ military: 15, provisions: -10, heaven: -5 }), nextTimelineId: 'cc-tl-013' },
      { direction: 'right', label: '穷寇莫追', effects: se({ politics: 10, provisions: 5, heaven: 5 }), nextTimelineId: 'cc-tl-013' },
    ],
  },
  {
    id: 'cc-tl-013',
    type: 'timeline',
    year: 207,
    character: '郭嘉',
    faction: '司空府祭酒',
    description: '郭嘉进言："主公，袁尚、袁熙已逃往乌桓。虽路远险阻，但兵贵神速。此处用兵，有道是"骄兵必败"！"',
    choices: [
      { direction: 'left', label: '好！北征乌桓！', effects: se({ military: 10, provisions: -15, heaven: 5 }), nextTimelineId: 'cc-tl-014' },
      { direction: 'right', label: '先稳固河北再说', effects: se({ politics: 8, provisions: 10, military: 5 }), nextTimelineId: 'cc-tl-014' },
    ],
  },
  {
    id: 'cc-tl-014',
    type: 'timeline',
    year: 208,
    character: '刘表',
    faction: '荆州刺史',
    description: '刘表病榻前："曹操，我知你雄才大略。我死之后，荆州便托付于你。只是我儿刘琮年轻，望将军善待之。"',
    choices: [
      { direction: 'left', label: '蔡夫人与刘琮，我自会安置', effects: se({ military: 15, provisions: 15, heaven: -3 }), nextTimelineId: 'cc-tl-015' },
      { direction: 'right', label: '景升放心，我必厚待他们', effects: se({ politics: 10, heaven: 5 }), nextTimelineId: 'cc-tl-015' },
    ],
  },
  {
    id: 'cc-tl-015',
    type: 'timeline',
    year: 208,
    character: '黄盖',
    faction: '东吴将领',
    description: '黄盖驾船靠近，大喊："曹公！东吴愿降！我船中皆是粮草辎重！"庞统在旁低声："曹公，此人船来太快，其中恐有诈。不如先用火箭试探。"',
    choices: [
      { direction: 'left', label: '既是来降，容我摆宴接风', effects: se({ heaven: -15, provisions: -15, military: -20 }), nextTimelineId: 'cc-side-005' },
      { direction: 'right', label: '来啊，先用火箭射之', effects: se({ heaven: -5, military: -5, provisions: -5 }), nextTimelineId: 'cc-side-005' },
    ],
  },
  {
    id: 'cc-tl-016',
    type: 'timeline',
    year: 211,
    character: '韩遂',
    faction: '西凉太守',
    description: '韩遂喊道："孟德！你我曾是西园八校尉的同袍，何必至此！"马超怒骂："曹操！今日必取你首级！"',
    choices: [
      { direction: 'left', label: '韩遂，你我当年同袍，为何反我？', effects: se({ politics: 15, military: 10, heaven: -5 }), nextTimelineId: 'cc-tl-017' },
      { direction: 'right', label: '马超！放马过来！', effects: se({ military: -10, provisions: -10, heaven: -8 }), nextTimelineId: 'cc-tl-017' },
    ],
  },
  {
    id: 'cc-tl-017',
    type: 'timeline',
    year: 213,
    character: '荀彧',
    faction: '尚书令',
    description: '荀彧进谏："主公！进爵魏公、加九锡，乃是王莽之举！臣不敢奉命！"你沉默良久："文若，你我相识多年。你当真要做一个"愚忠"之人？"',
    choices: [
      { direction: 'left', label: '汉室已无可救药', effects: se({ politics: 15, heaven: -10, provisions: 5 }), nextTimelineId: 'cc-side-006' },
      { direction: 'right', label: '此事容后再议', effects: se({ heaven: 10, politics: -5 }), nextTimelineId: 'cc-side-006' },
    ],
  },
  {
    id: 'cc-tl-018',
    type: 'timeline',
    year: 215,
    character: '张鲁',
    faction: '汉中太守',
    description: '张鲁投降："曹公，汉中三十万百姓、五万精兵，尽归明公！"你问："你为何不战而降？"张鲁答："我宁为魏公奴，不做汉室臣。"',
    choices: [
      { direction: 'left', label: '封你为侯，留在朝中', effects: se({ military: 15, provisions: 20, politics: 5 }), nextTimelineId: 'cc-tl-019' },
      { direction: 'right', label: '厚葬令堂，仍掌汉中', effects: se({ politics: 12, heaven: 8 }), nextTimelineId: 'cc-tl-019' },
    ],
  },
  {
    id: 'cc-tl-019',
    type: 'timeline',
    year: 219,
    character: '司马懿',
    faction: '太子中庶子',
    description: '司马懿急报："主公！关羽水淹七军，于禁投降，庞德被杀！关羽威震华夏！他已派人送来战书！"你展开战书，上面写道："曹某，你气数已尽！"',
    choices: [
      { direction: 'left', label: '联合孙权，共击关羽', effects: se({ military: 15, politics: 10, heaven: -5 }), nextTimelineId: 'cc-side-007' },
      { direction: 'right', label: '亲率大军迎战！', effects: se({ military: -10, heaven: -10, provisions: -15 }), nextTimelineId: 'cc-side-007' },
    ],
  },
  {
    id: 'cc-tl-020',
    type: 'timeline',
    year: 220,
    character: '曹丕',
    faction: '世子',
    description: '你病重榻前，曹丕跪地痛哭："父亲！"你艰难开口："子桓……我死之后，你要……收敛人心……分香卖履，余香可分……"',
    choices: [
      { direction: 'left', label: '继承大业，守住基业', effects: se({ politics: 10, heaven: 5 }), nextTimelineId: 'cc-tl-end' },
      { direction: 'right', label: '天意如此……', effects: se({ heaven: -10 }), nextTimelineId: 'cc-tl-end' },
    ],
  },
  {
    id: 'cc-tl-end',
    type: 'timeline',
    year: 220,
    character: '司马懿',
    faction: '太子中庶子',
    description: '你闭眼，耳畔传来司马懿的声音："魏王薨逝，天下震动。"回首这一生，你从一介校尉成长为魏王，奠定了曹魏基业。曹丕继位后废汉献帝，建立曹魏政权。你的霸业，终于完成。',
    choices: [
      { direction: 'left', label: '魏武挥鞭，基业已成', effects: se({ heaven: 15, politics: 10 }), nextTimelineId: null },
      { direction: 'right', label: '功过成败，留待后人评', effects: se({ heaven: 10, politics: 5 }), nextTimelineId: null },
    ],
    specialEndingId: 'ending-caocao-victory',
  },
  {
    id: 'cc-tl-bad-end',
    type: 'timeline',
    year: 189,
    character: '董卓',
    faction: '相国',
    description: '刺杀失败，你被当场擒拿。',
    choices: [
      { direction: 'left', label: '重开一局', effects: se({ heaven: 0, politics: 0, military: 0, provisions: 0 }), nextTimelineId: null },
      { direction: 'right', label: '重开一局', effects: se({ heaven: 0, politics: 0, military: 0, provisions: 0 }), nextTimelineId: null },
    ],
    specialEndingId: 'ending-caocao-bad',
  },
]

export const caoCaoSideEvents: SideEvent[] = [
  {
    id: 'cc-side-001',
    type: 'side',
    sideId: '捉放曹',
    character: '陈宫',
    faction: '中牟县令',
    description: '夜宿吕伯奢庄上，听见磨刀声。陈宫警觉："吕家人磨刀，必是要杀我们！"你杀吕家全家后发现只是杀猪。陈宫怒斥："你杀人全家，已是不义！"又遇打酒归来的吕伯奢，你将其杀死。陈宫："你杀人灭口，更是不忠！宁教我负天下人，休教天下人负我——这是人话吗？！"',
    choices: [
      { direction: 'left', label: '大丈夫立于天地，当断则断', effects: se({ heaven: -8, politics: -5 }), completionEventId: 'cc-side-001-complete' },
      { direction: 'right', label: '公台兄，道不同不相为谋', effects: se({ politics: -10 }), completionEventId: 'cc-side-001-complete' },
    ],
  },
  {
    id: 'cc-side-001-complete',
    type: 'side',
    sideId: '捉放曹',
    character: '陈宫',
    faction: '中牟县令',
    description: '陈宫含泪离去。你孤身逃往陈留，父亲曹嵩变卖家产两万五千金资助你起兵。夏侯惇、曹仁等将领纷纷来投。',
    choices: [
      { direction: 'left', label: '继续', effects: se({ provisions: 5 }), nextTimelineId: 'cc-tl-003' },
      { direction: 'right', label: '继续', effects: se({ provisions: 5 }), nextTimelineId: 'cc-tl-003' },
    ],
  },
  {
    id: 'cc-side-002',
    type: 'side',
    sideId: '陈宫离去',
    character: '陈宫',
    faction: '吕布谋士',
    description: '陈宫质问："曹操！徐州百姓何辜！你血流成河！我当初救你，只因你是条好汉。如今看来，你与董卓有何区别？！"顿了顿又道："自古以来就是大奸似忠，大伪似真。也许你昨天看错了我陈宫，可是今天呢？你又看错了！"',
    choices: [
      { direction: 'left', label: '任其离去', effects: se({ politics: -8, heaven: 5 }), completionEventId: 'cc-side-002-complete' },
      { direction: 'right', label: '来啊，将此人与吕布同缚！', effects: se({ politics: -15, military: 3 }), completionEventId: 'cc-side-002-complete' },
    ],
  },
  {
    id: 'cc-side-002-complete',
    type: 'side',
    sideId: '陈宫离去',
    character: '陈宫',
    faction: '吕布谋士',
    description: '陈宫离去，后投靠吕布。吕布在陈宫辅佐下夺取兖州大半。曹操失却根基。',
    choices: [
      { direction: 'left', label: '继续', effects: se({ military: 5 }), nextTimelineId: 'cc-tl-007' },
      { direction: 'right', label: '继续', effects: se({ military: 5 }), nextTimelineId: 'cc-tl-007' },
    ],
  },
  {
    id: 'cc-side-003',
    type: 'side',
    sideId: '煮酒论英雄',
    character: '刘备',
    faction: '左将军',
    description: '青梅煮酒，你问刘备："玄德，你久在江湖，可知谁是天下英雄？"刘备列举袁术、袁绍、刘表、孙策。你摇头："此等庸碌之辈，何足挂齿。"顿了顿："天下英雄，唯使君与操耳！"刘备惊得筷子落地。此时雷声大作，你笑问："大丈夫为何怕雷？"刘备答："一震之威，乃至于此。"',
    choices: [
      { direction: 'left', label: '试探：玄德久不归朝，岂无异心？', effects: se({ politics: -5, provisions: 5 }), completionEventId: 'cc-side-003-complete' },
      { direction: 'right', label: '大笑：我说的是雷声！', effects: se({ heaven: 8, provisions: -5 }), completionEventId: 'cc-side-003-complete' },
    ],
  },
  {
    id: 'cc-side-003-complete',
    type: 'side',
    sideId: '煮酒论英雄',
    character: '刘备',
    faction: '左将军',
    description: '刘备借口截击袁术，离开许昌。你目送他远去，叹道："今日不取其命，日后必成大患。可我若杀他，天下人又将如何看我？"',
    choices: [
      { direction: 'left', label: '继续', effects: se({ military: 5 }), nextTimelineId: 'cc-tl-008' },
      { direction: 'right', label: '继续', effects: se({ military: 5 }), nextTimelineId: 'cc-tl-008' },
    ],
  },
  {
    id: 'cc-side-004',
    type: 'side',
    sideId: '白门楼',
    character: '吕布',
    faction: '温侯',
    description: '吕布被绑缚白门楼，大喊："曹操！绑得太紧了！只要您饶我不死，我愿为您骑，替您取天下！"你转头问刘备："玄德，你怎么看？"刘备答："公不见丁原、董卓之事乎？"',
    choices: [
      { direction: 'left', label: '缢杀吕布', effects: se({ military: 5, heaven: -3 }), completionEventId: 'cc-side-004-complete' },
      { direction: 'right', label: '留吕布一命', effects: se({ military: -5, heaven: 5 }), completionEventId: 'cc-side-004-complete' },
    ],
  },
  {
    id: 'cc-side-004-complete',
    type: 'side',
    sideId: '白门楼',
    character: '陈宫',
    faction: '吕布谋士',
    description: '陈宫被押上堂，昂首不跪。你问："公台，你为何不跪？"陈宫答道："我羞于与你为伍！"你叹息，令人将陈宫、吕布一并斩首。',
    choices: [
      { direction: 'left', label: '继续', effects: se({ provisions: 10 }), nextTimelineId: 'cc-tl-010' },
      { direction: 'right', label: '继续', effects: se({ provisions: 10 }), nextTimelineId: 'cc-tl-010' },
    ],
  },
  {
    id: 'cc-side-005',
    type: 'side',
    sideId: '华容道',
    character: '关羽',
    faction: '蜀汉上将',
    description: '关羽横刀立马，拦住去路："曹操！今日你走投无路，还不下马受死！"你叹道："云长，当年你降我之时，我待你不薄。送你赤兔马、三日一小宴、五日一大宴。今日你当真要赶尽杀绝？"',
    choices: [
      { direction: 'left', label: '以情动之', effects: se({ heaven: -5, military: -10 }), completionEventId: 'cc-side-005-complete' },
      { direction: 'right', label: '拼死一战', effects: se({ military: -20, heaven: -10 }), completionEventId: 'cc-side-005-complete' },
    ],
  },
  {
    id: 'cc-side-005-complete',
    type: 'side',
    sideId: '华容道',
    character: '关羽',
    faction: '蜀汉上将',
    description: '关羽想起当年情义，默默垂下青龙偃月刀，侧身让路。你率残部三千余人逃出华容道，狼狈不堪。',
    choices: [
      { direction: 'left', label: '继续', effects: se({ provisions: -5 }), nextTimelineId: 'cc-tl-016' },
      { direction: 'right', label: '继续', effects: se({ provisions: -5 }), nextTimelineId: 'cc-tl-016' },
    ],
  },
  {
    id: 'cc-side-006',
    type: 'side',
    sideId: '铜雀台',
    character: '曹丕',
    faction: '世子',
    description: '铜雀台上，曹丕问："父亲，我和子建诗赋文章，谁更合您心意？"你笑而不语。曹丕又问："父亲若是考量继承大事，儿必不负所托。"曹植在旁默然。',
    choices: [
      { direction: 'left', label: '子桓可担大任', effects: se({ politics: 10, provisions: 5 }), completionEventId: 'cc-side-006-complete' },
      { direction: 'right', label: '子建才高，可继承我志', effects: se({ heaven: 10, provisions: 5 }), completionEventId: 'cc-side-006-complete' },
    ],
  },
  {
    id: 'cc-side-006-complete',
    type: 'side',
    sideId: '铜雀台',
    character: '曹丕',
    faction: '世子',
    description: '你最终立曹丕为世子。曹丕拜谢："儿必继承父亲基业！"',
    choices: [
      { direction: 'left', label: '继续', effects: se({ politics: 5 }), nextTimelineId: 'cc-tl-018' },
      { direction: 'right', label: '继续', effects: se({ politics: 5 }), nextTimelineId: 'cc-tl-018' },
    ],
  },
  {
    id: 'cc-side-007',
    type: 'side',
    sideId: '水淹七军',
    character: '孙权',
    faction: '吴王',
    description: '孙权来信："曹操，我愿与你联手共击关羽。他若败走，荆州归我，徐州归你。如何？"',
    choices: [
      { direction: 'left', label: '吴王此计甚妙！', effects: se({ military: 15, politics: 10, heaven: -5 }), completionEventId: 'cc-side-007-complete' },
      { direction: 'right', label: '云长乃当世英雄，我不忍', effects: se({ provisions: 5, heaven: -3 }), completionEventId: 'cc-side-007-complete' },
    ],
  },
  {
    id: 'cc-side-007-complete',
    type: 'side',
    sideId: '水淹七军',
    character: '吕蒙',
    faction: '东吴大都督',
    description: '孙权派吕蒙白衣渡江，袭取荆州。关羽败走麦城，被东吴擒杀。你闻讯大喜："云长一死，朕从此再无忧也！"然天下三分已成定局。',
    choices: [
      { direction: 'left', label: '继续', effects: se({ military: 5 }), nextTimelineId: 'cc-tl-020' },
      { direction: 'right', label: '继续', effects: se({ military: 5 }), nextTimelineId: 'cc-tl-020' },
    ],
  },
]

export function getCaoCaoFirstTimelineId(): string {
  return caoCaoTimeline[0]?.id || 'cc-tl-001'
}

export function getCaoCaoTimelineEvent(id: string): TimelineEvent | undefined {
  return caoCaoTimeline.find(e => e.id === id)
}

export function getCaoCaoSideEvent(id: string): SideEvent | undefined {
  return caoCaoSideEvents.find(e => e.id === id)
}