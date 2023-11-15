import { FC, useMemo } from "react";
import { CLOCKS_LENGTH } from "./constant";
import { TimeRangePickerValue } from "./type";

interface FooterProps {
  selectedValue:  TimeRangePickerValue;
  onClear: () => void;
  onPickWorkDay: () => void;
  onPickRestDay: () => void;
}

const Footer:FC<FooterProps> = ({ selectedValue, onClear, onPickWorkDay, onPickRestDay }) => {
  const renderTimeRangeText = useMemo(() => {
    return Object.entries(selectedValue).map(([key, value]) => (
      <div className="flex items-center px-5 mb-2 leading-6" key={key}>
        <h6>{key}</h6>
        <p className="w-[900px] text-left break-words pl-5 text-sm text-gray-500">
          {value}
        </p>
      </div>
    ))
  }, [selectedValue]);

  return (
    <tfoot>
      <tr>
        <td colSpan={CLOCKS_LENGTH + 1}>
          <div>
            <div className="flex px-5">
              <h6 className="flex-1 text-center">已选择时间段</h6>
              <button className="pr-5 text-blue-600" onClick={onPickWorkDay}>工作日黄金时间</button>
              <button className="pr-5 text-blue-600" onClick={onPickRestDay}>休息日黄金时间</button>
              <button className="text-blue-600" onClick={onClear}>清除</button>
            </div>
            {renderTimeRangeText}
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

export default Footer;