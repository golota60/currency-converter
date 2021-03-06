import React from "react";
import "./HistoricalBox.scss";
import { Divider, Button, DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

interface HistoricalBoxProps {
  className?: string;
  onDateChange: (val: any, formattedVal: any) => void;
  defaultValue: [any, any];
  onSubmit: () => void;
}

const HistoricalBox = ({
  className = "",
  onDateChange,
  defaultValue,
  onSubmit,
}: HistoricalBoxProps) => {
  return (
    <span className="converter-box__historical">
      <Divider>Historical Data</Divider>
      <RangePicker
        onChange={onDateChange}
        disabledDate={(current: any) => {
          return (
            current &&
            current.format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")
          );
        }}
        defaultValue={defaultValue}
      />
      <Button onClick={onSubmit}>Get Historical Data</Button>
    </span>
  );
};

export default HistoricalBox;
