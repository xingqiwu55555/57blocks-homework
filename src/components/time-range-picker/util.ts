import { clocks } from "./constant";

const toTimeRange = (arr: number[]): number[][] => {
  let result:number[][] = [], i = 0;

  arr.forEach((item, index) => {
    if (index === 0) {
      result[0] = [item];   
    } else if (item - arr[index-1] === 1 ) {
      result[i].push(item);
    } else {
      result[++i] = [item];
    }
  })

  return result;
}

const toTimeStr = (time: number, isStart = false) => {
  const isHalf = time % 2 === 0
  let clockIdx: number, minutesStr = '00'
  if (isStart) {
    clockIdx = Math.floor(time / 2)
    minutesStr = isHalf ? '00' : '30'
  } else {
    clockIdx = Math.ceil(time / 2)
    minutesStr = isHalf ? '30' : '00'
  }
  return `${clocks[clockIdx]}:${minutesStr}`
}

export const toTimeRangeStr = (arr: number[]): string => {
  const _arr = toTimeRange(arr);
  return _arr.map(item => {
    const [startTime] = item
    let endTime: number
    if (item.length === 1) {
      endTime = startTime
    } else {
      endTime = item[item.length - 1]
    }
    return `${toTimeStr(startTime, true)}~${toTimeStr(endTime)}`
  }).join("、")
}
