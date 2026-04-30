const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
         Header, Footer, AlignmentType, PageOrientation, LevelFormat,
         HeadingLevel, BorderStyle, WidthType, ShadingType,
         VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: '微软雅黑',
          size: 24
        }
      }
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: {
          size: 44,
          bold: true,
          font: '微软雅黑'
        },
        paragraph: {
          spacing: { before: 400, after: 200 },
          outlineLevel: 0
        }
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: {
          size: 32,
          bold: true,
          font: '微软雅黑'
        },
        paragraph: {
          spacing: { before: 300, after: 150 },
          outlineLevel: 1
        }
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: {
          size: 26,
          bold: true,
          font: '微软雅黑'
        },
        paragraph: {
          spacing: { before: 200, after: 100 },
          outlineLevel: 2
        }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '•',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 600, hanging: 300 } } }
        }]
      },
      {
        reference: 'numbers',
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: '%1.',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 600, hanging: 300 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [new TextRun({ text: '千古筑迹——古建筑与历史体验游戏', bold: true, size: 18 })],
          alignment: AlignmentType.RIGHT
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: '第 ', size: 16 }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16 }),
            new TextRun({ text: ' 页', size: 16 })
          ],
          alignment: AlignmentType.CENTER
        })]
      })
    },
    children: [
      new Paragraph({ children: [new TextRun({ text: '', break: 8 })] }),
      new Paragraph({
        children: [new TextRun({ text: '千古筑迹', bold: true, size: 88, color: '1a2332' })],
        alignment: AlignmentType.CENTER, spacing: { after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: '——古建筑与历史体验游戏', size: 44, color: 'd2b270' })],
        alignment: AlignmentType.CENTER, spacing: { after: 400 }
      }),
      new Paragraph({
        children: [new TextRun({ text: '游戏设计文档', size: 32, color: '666666' })],
        alignment: AlignmentType.CENTER, spacing: { after: 1000 }
      }),
      new Paragraph({
        children: [new TextRun({ text: '2026年大学生计算机设计大赛', size: 26 })],
        alignment: AlignmentType.CENTER, spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: '中华优秀传统文化系列之六', size: 26 })],
        alignment: AlignmentType.CENTER, spacing: { after: 300 }
      }),
      new Paragraph({ children: [new TextRun({ text: '', break: 3 })] }),
      new Paragraph({
        children: [new TextRun({ text: '中国三国时期建筑与历史文化互动体验', size: 22, color: '888888' })],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('目  录')] }),
      new Paragraph({ children: [new TextRun({ text: '一、游戏简介', size: 26, bold: true })], spacing: { before: 200, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: '二、创作立意', size: 26, bold: true })], spacing: { before: 150, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: '三、核心玩法', size: 26, bold: true })], spacing: { before: 150, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: '四、交互机制', size: 26, bold: true })], spacing: { before: 150, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: '五、技术路线', size: 26, bold: true })], spacing: { before: 150, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: '六、重难点说明', size: 26, bold: true })], spacing: { before: 150, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: '七、美术风格说明', size: 26, bold: true })], spacing: { before: 150, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: '八、操作手册', size: 26, bold: true })], spacing: { before: 150, after: 100 } }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('一、游戏简介')] }),
      new Paragraph({
        children: [new TextRun({
          text: '《千古筑迹——古建筑与历史体验游戏》是一款以中国三国时期（公元189年-220年）为背景的历史文化体验游戏。游戏以中国古代建筑为主题，通过互动式古地图系统，让玩家在虚拟的三国世界中探索著名的历史遗址、建筑遗迹，并体验发生在这些地点的历史事件。',
          size: 24
        })], spacing: { after: 150 }
      }),
      new Paragraph({
        children: [new TextRun({
          text: '本游戏响应2026年大学生计算机设计大赛"中国古代建筑成就——中华优秀传统文化系列之六"的赛事主题，将中国古代建筑文化、三国历史人物与互动游戏机制完美融合，旨在通过现代信息技术传播中华优秀传统文化。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('1.1 游戏特色')] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '地点探索：游戏中包含9个三国时期著名的建筑地点', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '历史体验：每个地点都有真实的历史事件和人物', size: 24 })], spacing: { after: 200 } }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('1.2 游戏地点一览')] }),
      new Paragraph({ children: [new TextRun({ text: '都城类（5个）：', size: 24, bold: true })], spacing: { after: 80 } }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '许昌：曹操的根据地与政治中心', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '洛阳：东汉都城，千年帝都', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '成都：蜀汉都城，刘备称帝之地', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '建业：东吴都城，孙权建立基业之地', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '荆州：兵家必争之地', size: 24 })], spacing: { after: 120 } }),
      new Paragraph({ children: [new TextRun({ text: '古战场类（4个）：', size: 24, bold: true })], spacing: { after: 80 } }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '虎牢关：天下第一关，三英战吕布之地', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '赤壁：三国最著名战场，孙刘联军大破曹军', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '长坂坡：赵云单骑救主之地', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '麦城：关羽败走之地', size: 24 })], spacing: { after: 200 } }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('二、创作立意')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('2.1 文化传承与创新')] }),
      new Paragraph({
        children: [new TextRun({
          text: '中国古代建筑是中华文明的重要组成部分，蕴含着丰富的历史信息、文化内涵和建筑智慧。本游戏的创作立意在于：传承传统建筑文化、活化历史知识、技术与文化融合。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('2.2 教育意义')] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '历史知识普及：通过具体的历史事件和人物介绍', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '建筑文化认知：展示三国时期的都城建筑、关隘防御工程等', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '决策能力培养：游戏中的选择机制培养玩家的逻辑思维', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '传统文化认同：增强玩家对中华优秀传统文化的认同感', size: 24 })], spacing: { after: 200 } }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('2.3 赛事主题契合')] }),
      new Paragraph({ children: [new TextRun({ text: '建筑类型：涵盖民居、官府、皇宫、桥梁等多种建筑类型。时间限定：所有内容严格限定在1911年以前，聚焦三国时期及之前的建筑成就。', size: 24 })] }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('三、核心玩法')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.1 游戏模式')] }),
      new Paragraph({ children: [new TextRun({ text: '古地图模式（推荐）：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '玩家进入中国古地图界面，通过点击地图上的地点标记选择想要探索的位置。地图上标注了9个三国时期的著名地点，分为都城、古战场和战略要地三类。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ children: [new TextRun({ text: '传统人物模式：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '玩家选择一位主公（曹操、刘备、孙坚、袁绍或董卓），以该主公的视角体验其一生的事件。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.2 地点事件体验')] }),
      new Paragraph({
        children: [new TextRun({
          text: '每个地点都包含2-3个著名的历史事件，玩家可以选择体验。以许昌为例：事件一"挟天子以令诸侯"（196年），曹操迎汉献帝至许昌，开始了真正的权臣之路。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.3 属性系统')] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏采用创新的四维属性系统，影响游戏进程和结局：',
          size: 24
        })], spacing: { after: 150 }
      }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [1800, 2500, 4726],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: '1a2332', type: ShadingType.CLEAR },
                width: { size: 1800, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '属性名称', bold: true, color: 'FFFFFF', size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: '1a2332', type: ShadingType.CLEAR },
                width: { size: 2500, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '属性说明', bold: true, color: 'FFFFFF', size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: '1a2332', type: ShadingType.CLEAR },
                width: { size: 4726, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '游戏影响', bold: true, color: 'FFFFFF', size: 22 })], alignment: AlignmentType.CENTER })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                width: { size: 1800, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '天意', bold: true, size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                width: { size: 2500, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '天命所归，民心所向', size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                width: { size: 4726, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '影响正统性和百姓支持度', size: 22 })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
                width: { size: 1800, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '权谋', bold: true, size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
                width: { size: 2500, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '政治智慧，权术运用', size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
                width: { size: 4726, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '影响政治资源和人才招揽', size: 22 })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                width: { size: 1800, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '兵力', bold: true, size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                width: { size: 2500, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '军事力量，军队实力', size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                width: { size: 4726, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '影响战争胜负和领土扩张', size: 22 })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
                width: { size: 1800, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '粮草', bold: true, size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
                width: { size: 2500, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '后勤保障，物资储备', size: 22 })], alignment: AlignmentType.CENTER })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
                width: { size: 4726, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: '影响持续作战能力和经济发展', size: 22 })] })]
              })
            ]
          })
        ]
      }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('四、交互机制')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('4.1 触摸与滑动交互')] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏核心交互采用触摸滑动机制，模拟手机卡牌的滑动体验：',
          size: 24
        })], spacing: { after: 150 }
      }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '触摸开始：玩家触摸事件卡片，开始拖动', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '滑动选择：根据滑动方向（向左或向右）选择对应的选项', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '视觉反馈：滑动时卡片会跟随手指移动，并产生倾斜效果', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '属性预览：滑动时实时显示选择将带来的属性变化', size: 24 })], spacing: { after: 200 } }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('4.2 地点地图交互')] }),
      new Paragraph({
        children: [new TextRun({
          text: '古地图界面提供丰富的交互方式：鼠标悬停显示地点名称、点击进入详情页、侧边栏快速浏览、分类筛选等功能。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('4.3 属性反馈机制')] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏提供直观的属性变化反馈：实时数值、变化预览、颜色警示（属性>=80或<=20时红色警示）、动画效果等。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('五、技术路线')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('5.1 前端技术栈')] }),
      new Paragraph({
        children: [new TextRun({
          text: '前端采用现代化的Vue 3框架：',
          size: 24
        })], spacing: { after: 150 }
      }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: 'Vue 3：采用Composition API，充分利用Vue 3的响应式系统和组件化优势', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: 'TypeScript：全类型安全开发，提高代码质量和可维护性', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: 'Vite：极速的开发服务器启动和热模块替换', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: 'Pinia：轻量级状态管理，替代Vuex的现代化解决方案', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: 'Vue Router：路由管理，支持多页面应用', size: 24 })], spacing: { after: 200 } }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('5.2 后端技术栈')] }),
      new Paragraph({
        children: [new TextRun({
          text: '后端采用Spring Boot框架：Spring Boot 3（现代化Java后端框架）、Java 17（最新LTS版本）、Maven（项目构建和依赖管理）、Nginx（前端静态资源托管和反向代理）。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('5.3 系统架构')] }),
      new Paragraph({
        children: [new TextRun({
          text: '系统采用前后端分离架构：前端层（Vue 3）负责用户界面展示和交互逻辑、接口层（RESTful API）通过Axios与后端通信、后端层（Spring Boot）处理业务逻辑、部署层（Nginx）静态资源托管和请求转发。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('六、重难点说明')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('6.1 技术难点')] }),
      new Paragraph({ children: [new TextRun({ text: '触摸滑动交互实现：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '需要实现流畅的触摸滑动效果，包括触摸事件监听、拖动位置计算、方向判定、阈值检测等。解决方法是利用Vue 3的响应式系统和Pointer Events API，精确计算滑动距离和方向。',
          size: 24
        })], spacing: { after: 150 }
      }),
      new Paragraph({ children: [new TextRun({ text: '响应式布局适配：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏需要适配从手机到桌面电脑的多种屏幕尺寸。采用CSS Grid和Flexbox布局，结合CSS clamp()函数和响应式单位，实现自适应的UI设计。',
          size: 24
        })], spacing: { after: 150 }
      }),
      new Paragraph({ children: [new TextRun({ text: '状态管理复杂性：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏状态包括选中的人物、地点、四维属性、游戏进度等多个维度。使用Pinia进行状态管理，将游戏逻辑和UI逻辑分离，提高代码的可维护性。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('6.2 内容难点')] }),
      new Paragraph({ children: [new TextRun({ text: '历史真实性与游戏性的平衡：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '需要在保持历史真实性的同时，确保游戏的可玩性和趣味性。解决方法是深入研究历史资料，确保事件描述和人物设定的准确性，同时通过属性系统和多结局设计增加游戏深度。',
          size: 24
        })], spacing: { after: 150 }
      }),
      new Paragraph({ children: [new TextRun({ text: '建筑知识的准确呈现：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '每个地点的建筑特色和历史意义需要准确呈现。通过详细的地点描述和历史背景介绍，让玩家在游戏过程中学习到真实的建筑知识。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('6.3 设计重点')] }),
      new Paragraph({ children: [new TextRun({ text: '用户体验优化：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏操作简单直观，新手教程清晰明了，让玩家能够快速上手。同时通过视觉反馈和动画效果，提升游戏的沉浸感和流畅度。',
          size: 24
        })], spacing: { after: 150 }
      }),
      new Paragraph({ children: [new TextRun({ text: '传统文化呈现：', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({
          text: '通过中国传统配色（深靛蓝、金色、米白）、传统字体（思源宋体）和装饰元素（云纹、回纹），营造浓厚的古典氛围，让玩家感受到中华文化的魅力。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('七、美术风格说明')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('7.1 整体风格定位')] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏采用"新古典主义"设计风格，将中国传统美学与现代简约设计完美融合。整体视觉呈现出沉稳、大气、典雅的古典韵味，同时不失现代感和科技感。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('7.2 配色方案')] }),
      new Paragraph({ children: [new TextRun({ text: '主色调：', size: 24, bold: true })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '深靛蓝色（#1a2332）：主背景色，沉稳大气', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '古典金色（#d2b270）：强调色，用于标题和重点元素', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '米白色（#f4efe5）：文字色，高对比度易读', size: 24 })], spacing: { after: 150 } }),
      new Paragraph({ children: [new TextRun({ text: '辅助配色：', size: 24, bold: true })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '曹操蓝（#6f8fd8）：代表魏国', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '刘备黄（#FACD05）：代表蜀汉', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '孙权绿（#ACD86F）：代表东吴', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '董卓红（#c95f56）：代表西北军阀', size: 24 })], spacing: { after: 200 } }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('7.3 装饰元素')] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏中融入了丰富的中国传统装饰元素：云纹（用于背景装饰）、回纹（用于边框和分隔线）、龙纹（用于重要元素的装饰）、瓦当图案（用于卡片和按钮的装饰）。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('7.4 字体设计')] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏采用中文衬线字体作为主要字体：Source Han Serif SC（思源宋体）用于标题和重要文字、Noto Serif SC作为备选字体、宋体/STSong作为系统备选字体。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('7.5 视觉层次')] }),
      new Paragraph({
        children: [new TextRun({
          text: '游戏界面采用多层次的视觉设计：背景层（渐变背景+装饰性光晕效果）、内容层（卡片、面板、按钮等UI元素）、交互层（浮动提示、动画效果等交互反馈）。',
          size: 24
        })], spacing: { after: 200 }
      }),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('八、操作手册')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('8.1 快速开始')] }),
      new Paragraph({ children: [new TextRun({ text: '第一步：启动游戏', size: 24, bold: true })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '打开浏览器访问游戏首页', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '首页展示游戏标题和主公选择轮播', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '点击"进入古地图"按钮进入地图模式', size: 24 })], spacing: { after: 150 } }),
      new Paragraph({ children: [new TextRun({ text: '第二步：选择地点', size: 24, bold: true })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '在地图上点击想要探索的地点标记', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '或从右侧栏选择地点', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '阅读地点介绍，了解历史背景', size: 24 })], spacing: { after: 150 } }),
      new Paragraph({ children: [new TextRun({ text: '第三步：体验事件', size: 24, bold: true })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '阅读事件描述，了解历史情境', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '观察四维属性面板，了解当前状态', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '向左或向右滑动卡片做出选择', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'numbers', level: 0 }, children: [new TextRun({ text: '观察属性变化，进入下一个事件', size: 24 })], spacing: { after: 200 } }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('8.2 游戏操作指南')] }),
      new Paragraph({ children: [new TextRun({ text: '卡牌滑动操作：', size: 24, bold: true })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '触摸卡牌开始拖动', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '滑动距离超过100像素时触发选择', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '向左滑动选择左侧选项，向右滑动选择右侧选项', size: 24 })], spacing: { after: 150 } }),
      new Paragraph({ children: [new TextRun({ text: '地图浏览操作：', size: 24, bold: true })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '鼠标悬停地点标记查看名称', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '点击地点标记进入详情页', size: 24 })] }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun({ text: '使用侧边栏快速导航', size: 24 })], spacing: { after: 200 } }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('8.3 常见问题解答')] }),
      new Paragraph({ children: [new TextRun({ text: 'Q: 如何重新开始游戏？', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({ text: 'A: 点击返回按钮回到首页，然后重新选择地点或主公开始新游戏', size: 24 })], spacing: { after: 150 }
      }),
      new Paragraph({ children: [new TextRun({ text: 'Q: 属性归零会怎样？', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({ text: 'A: 任意一项属性归零都会触发游戏结束，显示相应的结局', size: 24 })], spacing: { after: 150 }
      }),
      new Paragraph({ children: [new TextRun({ text: 'Q: 有多少种结局？', size: 24, bold: true })] }),
      new Paragraph({
        children: [new TextRun({ text: 'A: 游戏包含8种常规结局和多种特殊结局，取决于玩家的选择和属性发展', size: 24 })], spacing: { after: 400 }
      }),
      new Paragraph({ children: [new TextRun({ text: '《千古筑迹》项目组', size: 26, bold: true })], alignment: AlignmentType.CENTER, spacing: { after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: '2026年', size: 22 })], alignment: AlignmentType.CENTER })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('e:/gamedemo/千古筑迹_游戏设计文档.docx', buffer);
  console.log('文档已生成：千古筑迹_游戏设计文档.docx');
});
