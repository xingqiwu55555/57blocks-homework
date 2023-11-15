import { memo } from "react";
import { CLOCKS_LENGTH, clocks } from "./constant";

const Header = memo(() => {
  const theadColumnData = clocks.filter((_, idx) => idx < clocks.length - 1)
  
  return (
    <thead>
      <tr>
        <th className="border border-slate-300" colSpan={CLOCKS_LENGTH + 1}>
          <div className="flex justify-end px-5">
            <div className="mr-5">
              <label className="inline-block mr-[10px] w-[30px] h-[10px] bg-blue-600"></label>
              已选</div>
            <div>
              <label className="inline-block mr-[10px] w-[30px] h-[10px] border border-slate-300"></label>
              未选</div>
          </div>
        </th>
      </tr>
      <tr>
        <th className="border border-slate-300" rowSpan={2}>
          星期/时间
        </th>
        <th className="border border-slate-300" colSpan={CLOCKS_LENGTH / 2}>00:00 - 12:00</th>
        <th className="border border-slate-300" colSpan={CLOCKS_LENGTH / 2}>12:00 - 24:00</th>
      </tr>
      <tr>
        {theadColumnData.map((_, idx) => (
          <th className="border border-slate-300 w-[36px]" colSpan={2} key={idx}>{idx}</th>
        ))}
      </tr>
    </thead>
  );
})

export default Header