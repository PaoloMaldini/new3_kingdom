import type { TimelineEvent, SideEvent } from '../types'
import { caoCaoTimeline, caoCaoSideEvents, getCaoCaoFirstTimelineId, getCaoCaoTimelineEvent, getCaoCaoSideEvent } from './caoCao'
import { liuBeiTimeline, liuBeiSideEvents, getLiuBeiFirstTimelineId, getLiuBeiTimelineEvent, getLiuBeiSideEvent } from './liuBei'
import { sunQuanTimeline, sunQuanSideEvents, getSunQuanFirstTimelineId, getSunQuanTimelineEvent, getSunQuanSideEvent } from './sunQuan'
import { yuanShaoTimeline, yuanShaoSideEvents, getYuanShaoFirstTimelineId, getYuanShaoTimelineEvent, getYuanShaoSideEvent } from './yuanShao'
import { dongZhuoTimeline, dongZhuoSideEvents, getDongZhuoFirstTimelineId, getDongZhuoTimelineEvent, getDongZhuoSideEvent } from './dongZhuo'

export { caoCaoTimeline, caoCaoSideEvents, getCaoCaoFirstTimelineId, getCaoCaoTimelineEvent, getCaoCaoSideEvent }
export { liuBeiTimeline, liuBeiSideEvents, getLiuBeiFirstTimelineId, getLiuBeiTimelineEvent, getLiuBeiSideEvent }
export { sunQuanTimeline, sunQuanSideEvents, getSunQuanFirstTimelineId, getSunQuanTimelineEvent, getSunQuanSideEvent }
export { yuanShaoTimeline, yuanShaoSideEvents, getYuanShaoFirstTimelineId, getYuanShaoTimelineEvent, getYuanShaoSideEvent }
export { dongZhuoTimeline, dongZhuoSideEvents, getDongZhuoFirstTimelineId, getDongZhuoTimelineEvent, getDongZhuoSideEvent }

export type { TimelineEvent, SideEvent }

export type ScenarioData = {
  timeline: TimelineEvent[]
  sideEvents: SideEvent[]
  getFirstTimelineId: () => string
  getTimelineEvent: (id: string) => TimelineEvent | undefined
  getSideEvent: (id: string) => SideEvent | undefined
}

export function getScenarioData(leaderId: string): ScenarioData | undefined {
  switch (leaderId) {
    case 'cao-cao':
      return {
        timeline: caoCaoTimeline,
        sideEvents: caoCaoSideEvents,
        getFirstTimelineId: getCaoCaoFirstTimelineId,
        getTimelineEvent: getCaoCaoTimelineEvent,
        getSideEvent: getCaoCaoSideEvent,
      }
    case 'liu-bei':
      return {
        timeline: liuBeiTimeline,
        sideEvents: liuBeiSideEvents,
        getFirstTimelineId: getLiuBeiFirstTimelineId,
        getTimelineEvent: getLiuBeiTimelineEvent,
        getSideEvent: getLiuBeiSideEvent,
      }
    case 'sun-quan':
      return {
        timeline: sunQuanTimeline,
        sideEvents: sunQuanSideEvents,
        getFirstTimelineId: getSunQuanFirstTimelineId,
        getTimelineEvent: getSunQuanTimelineEvent,
        getSideEvent: getSunQuanSideEvent,
      }
    case 'yuan-shao':
      return {
        timeline: yuanShaoTimeline,
        sideEvents: yuanShaoSideEvents,
        getFirstTimelineId: getYuanShaoFirstTimelineId,
        getTimelineEvent: getYuanShaoTimelineEvent,
        getSideEvent: getYuanShaoSideEvent,
      }
    case 'dong-zhuo':
      return {
        timeline: dongZhuoTimeline,
        sideEvents: dongZhuoSideEvents,
        getFirstTimelineId: getDongZhuoFirstTimelineId,
        getTimelineEvent: getDongZhuoTimelineEvent,
        getSideEvent: getDongZhuoSideEvent,
      }
    default:
      return undefined
  }
}

export function getInitialYear(leaderId: string): number {
  switch (leaderId) {
    case 'cao-cao':
    case 'liu-bei':
    case 'sun-quan':
    case 'yuan-shao':
    case 'dong-zhuo':
      return 189
    default:
      return 189
  }
}