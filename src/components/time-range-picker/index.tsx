import { useMemo, useRef, useState } from "react";
import { CLOCKS_LENGTH, days } from "./constant"
import Footer from "./footer"
import Header from "./header"
import { TimeRangePickerUnits, TimeRangePickerValue } from "./type"
import cls from "classnames"
import { toTimeRangeStr } from "./util";

const HOVER_COLOR_CLASS = "bg-blue-300"
const ACTIVE_COLOR_CLASS = "bg-blue-600"

const MIN_PRIMARY_CLOCK = 9 * 2
const MAX_PRIMARY_CLOCK = (9 + 12) * 2 - 1

const generateInitialTimeUnits = (): TimeRangePickerUnits => days.map(() => {
  let units = [];
  for (let j = 0; j < CLOCKS_LENGTH; j++) {
    units.push({ activeClass: "", clock: j, hoverClass: "" });
  }
  return units;
})

export default function TimeRangePicker() {
  const mouseRef = useRef<any>(null)
  const [timeUnits, setTimeUnits] = useState<TimeRangePickerUnits>(generateInitialTimeUnits)

  const setMouseRefData = (day: number, clock: number) => {
    const mouseData = mouseRef.current
    const { startDay, startClock } = mouseRef.current
    if (startDay <= day) {
      mouseData.minDay = startDay
      mouseData.maxDay = day
    } else {
      mouseData.minDay = day
      mouseData.maxDay = startDay
    }
    if (startClock <= clock) {
      mouseData.minClock = startClock
      mouseData.maxClock = clock
    } else {
      mouseData.minClock = clock
      mouseData.maxClock = startClock
    }
  }

  const handleMouseDown = (event: any, day: number, clock: number) => {
    event.preventDefault();
    
    mouseRef.current = {
      startDay: day,
      startClock: clock,
      minDay: day,
      minClock: clock,
      maxDay: day,
      maxClock: clock
    }
  }


  const handleMouseUp = (event: any, day: number, clock: number) => {
    event.preventDefault();
    const mouseData = mouseRef.current
    if (mouseData) {
      const _timeUnits = timeUnits.map((units, idx) => (units.map((unit) => ({
        ...unit,
        hoverClass: "",
        activeClass: (unit.activeClass || ((idx >= mouseData.minDay && idx <= mouseData.maxDay) && (unit.clock >= mouseData.minClock && unit.clock <= mouseData.maxClock))) ? ACTIVE_COLOR_CLASS : ""
      }))))
      
      setTimeUnits(_timeUnits)
      mouseRef.current = null
    }
  }

  const handleMouseOver = (event: any, day: number, clock: number) => {
    event.preventDefault();
    const mouseData = mouseRef.current
    if (mouseData) {
      setMouseRefData(day, clock)
      const _timeUnits = timeUnits.map((units, idx) => (units.map((unit) => ({
        ...unit,
        hoverClass: ((idx >= mouseData.minDay && idx <= mouseData.maxDay) && (unit.clock >= mouseData.minClock && unit.clock <= mouseData.maxClock)) ? HOVER_COLOR_CLASS : "",
      }))))

      setTimeUnits(_timeUnits)
    }
  }

  const handleClear = () => {
    setTimeUnits(generateInitialTimeUnits())
  }

  const setPrimaryTimeUnits = (minDay: number, maxDay: number) => {
    const _timeUnits = timeUnits.map((units, idx) => (units.map((unit) => ({
      ...unit,
      activeClass: (idx >= minDay && idx <= maxDay) && (unit.clock >= MIN_PRIMARY_CLOCK && unit.clock <= MAX_PRIMARY_CLOCK) ? ACTIVE_COLOR_CLASS : "",
    }))))

    setTimeUnits(_timeUnits)
  }

  const handlePickWorkDay = () => {
    setPrimaryTimeUnits(0, 4)
  }

  const handlePickRestDay = () => {
    setPrimaryTimeUnits(5, 6)
  }

  const selectedValue: TimeRangePickerValue = useMemo(() => {
    return timeUnits.reduce((value: TimeRangePickerValue, units, dayIdx) => {
      const filterUnits = units.filter(unit => !!unit.activeClass).map(unit => unit.clock)
      if (filterUnits.length > 0) {
        value[days[dayIdx]] = toTimeRangeStr(filterUnits)
      }
      return value
    }, {})
  }, [timeUnits]);

  return (
    <table className="w-[1000px] mx-auto table-auto border-collapse border border-slate-300 leading-10">
      <Header />
      <tbody>
        {
          timeUnits.map((units, day) => {
            return (<tr key={day}>
              <td className="border border-slate-300 text-center">{days[day]}</td>
              {
                units.map(({ clock, activeClass, hoverClass }) => (
                  <td
                    key={clock}
                    className={cls("border border-slate-300", activeClass, hoverClass)}
                    onMouseDown={(e) => handleMouseDown(e, day, clock)}
                    onMouseUp={(e) => handleMouseUp(e, day, clock)}
                    onMouseOver={(e) => handleMouseOver(e, day, clock)}
                  ></td>
                ))
              }
            </tr>)
          })
        }
      </tbody>
      <Footer
        selectedValue={selectedValue}
        onClear={handleClear}
        onPickWorkDay={handlePickWorkDay}
        onPickRestDay={handlePickRestDay}
      />
    </table>
  )
}