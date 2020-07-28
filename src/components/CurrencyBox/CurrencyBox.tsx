import React, { ReactNode } from "react";
import "./CurrencyBox.scss";
import { Select, InputNumber } from "antd";

interface CurrencyBoxProps {
  className?: string;
  options: Array<ReactNode>;
  selectFromValue: string;
  selectFromOnChange: (e: any) => void;
  selectToValue: string;
  selectToOnChange: (e: any) => void;
  inputValue: number;
  inputOnChange: (e: any) => void;
}

const CurrencyBox = ({
  options,
  className = "",
  selectFromValue,
  selectFromOnChange,
  selectToValue,
  selectToOnChange,
  inputValue,
  inputOnChange,
}: CurrencyBoxProps) => {
  return (
    <span className={`currencyBox ${className}`}>
      <div className='currencyBox__select-wrapper'>
        From
        <Select
          showSearch
          className="currencyBox-select"
          value={selectFromValue}
          onChange={selectFromOnChange}
        >
          {options}
        </Select>
        To
        <Select
          showSearch
          className="currencyBox-select"
          value={selectToValue}
          onChange={selectToOnChange}
        >
          {options}
        </Select>
      </div>
      <div>
        <InputNumber
          min={0}
          className="currencyBox-input"
          value={inputValue}
          onChange={inputOnChange}
        />
      </div>
    </span>
  );
};

export default CurrencyBox;
