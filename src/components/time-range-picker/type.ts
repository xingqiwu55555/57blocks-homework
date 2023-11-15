interface TimeRange {
  activeClass: string;
  hoverClass: string;
  clock: number;
}

export type TimeRangePickerUnits = Array<Array<TimeRange>>

export interface TimeRangePickerValue {
  [key: string]: string
}