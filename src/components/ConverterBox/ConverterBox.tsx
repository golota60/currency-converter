import React, { useEffect, useState } from "react";
import "./ConverterBox.scss";
import { Select, Spin, Divider, Button, DatePicker } from "antd";
import {
  GetLatestCurrenciesResponse,
  getLatestCurrencies,
  getCurrenciesByDate,
} from "../../helpers/fetches";
import moment from "moment";
import CurrencyBox from "../CurrencyBox/CurrencyBox";
import Logo from "../common/Logo/Logo";
import HistoricalBox from "../HistoricalBox/HistoricalBox";
const { Option } = Select;

enum ConverterStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
}

interface FormData {
  fromCurr: string;
  fromVal: number;
  toCurr: string;
}

interface HistoricalFormData {
  dateStart: string;
  dateEnd: string;
  isShown: boolean;
}

const ConverterBox = () => {
  //custom hook to preserve state
  const usePreservedState = (key: string, defaultValue: any) => {
    const [state, setState] = React.useState(
      () => JSON.parse(localStorage.getItem(key)!) || defaultValue
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  };

  const [formData, setFormData] = usePreservedState("converter-state", {
    fromCurr: "EUR",
    toCurr: "EUR",
  } as FormData);
  const [currencyData, setCurrencyData] = useState<GetLatestCurrenciesResponse>(
    {} as GetLatestCurrenciesResponse
  );
  const [status, setStatus] = useState(ConverterStatus.IN_PROGRESS);
  const [historical, setHistorical] = usePreservedState(
    "converter-historical-state",
    {
      isShown: false,
      dateStart: moment().format("YYYY-MM-DD"),
      dateEnd: moment().format("YYYY-MM-DD"),
    } as HistoricalFormData
  );
  const toggleShowHistorical = () =>
    setHistorical({ ...historical, isShown: !historical.isShown });
  const [resultMessage, setResultMessage] = useState<string>("");

  const onDateRangeChange = (value: any, dateString: any) => {
    setHistorical({
      ...historical,
      dateStart: dateString[0],
      dateEnd: dateString[1],
    });
  };

  const fetchLatestCurrencyData = async (baseCurrency: string = "EUR") => {
    setStatus(ConverterStatus.IN_PROGRESS);
    try {
      const fetchedData = await getLatestCurrencies(baseCurrency);
      setCurrencyData(fetchedData);
      setStatus(ConverterStatus.SUCCESS);
      return fetchedData;
    } catch (err) {
      console.error(err);
      setStatus(ConverterStatus.FAILED);
      return {} as GetLatestCurrenciesResponse;
    }
  };

  const fetchHistoricalCurrencyData = async (
    baseCurrency: string = "EUR",
    date?: string
  ) => {
    setStatus(ConverterStatus.IN_PROGRESS);
    try {
      const fetchedData = await getCurrenciesByDate(baseCurrency, date);
      setCurrencyData(fetchedData);
      setStatus(ConverterStatus.SUCCESS);
      return fetchedData;
    } catch (err) {
      console.error(err);
      setStatus(ConverterStatus.FAILED);
      return {} as GetLatestCurrenciesResponse;
    }
  };

  useEffect(() => {
    fetchLatestCurrencyData();
  }, []);

  switch (status) {
    case ConverterStatus.IN_PROGRESS:
      return <Spin size="large" />;
    case ConverterStatus.FAILED:
      return <div className="converter-box">Failed to fetch data</div>;
    case ConverterStatus.SUCCESS:
      const currencies = Object.keys(currencyData.rates).map((key) => (
        <Option value={key} key={key}>
          {key}
        </Option>
      ));
      const handleConvertClick = async () => {
        const currData = await fetchLatestCurrencyData(formData.fromCurr);
        if (formData.fromCurr === formData.toCurr) {
          setResultMessage("Those are the same currencies");
        } else {
          const currencyModifier = Object.entries(currData.rates).find(
            (rateElem) => rateElem[0] === formData.toCurr
          )![1];
          const message = `${formData.fromVal} ${formData.fromCurr} is worth ${
            formData.fromVal * (currencyModifier as number)
          } ${formData.toCurr}`;
          setResultMessage(message);
        }
      };

      const handleHistoricalDataClick = async () => {
        const startDateData = await fetchHistoricalCurrencyData(
          formData.fromCurr,
          historical.dateStart
        );
        const endDateData = await fetchHistoricalCurrencyData(
          formData.fromCurr,
          historical.dateEnd
        );
        if (formData.fromCurr === formData.toCurr) {
          setResultMessage("Those are the same currencies");
        } else {
          const startCurrencyModifier = Object.entries(
            startDateData.rates
          ).find((rateElem) => rateElem[0] === formData.toCurr)![1];
          const endCurrencyModifier = Object.entries(endDateData.rates).find(
            (rateElem) => rateElem[0] === formData.toCurr
          )![1];
          const startValue =
            formData.fromVal * (startCurrencyModifier as number);
          const endValue = formData.fromVal * (endCurrencyModifier as number);
          const percentageDiff = ((endValue - startValue) / startValue) * 100;
          const message = `${formData.fromVal} ${
            formData.fromCurr
          } was worth \n ${startValue} ${formData.toCurr} on ${
            historical.dateStart
          } \n and \n ${endValue} ${formData.toCurr} on ${
            historical.dateEnd
          } \n (${percentageDiff.toFixed(2)}% Difference)`;
          setResultMessage(message);
        }
      };

      return (
        <div className="converter-box">
          <Logo />
          <h1>Currency Converter</h1>
          <Divider>Currencies</Divider>
          <span className="converter-box__currencyBoxes">
            <CurrencyBox
              options={currencies}
              inputValue={formData.fromVal}
              inputOnChange={(value) =>
                setFormData({ ...formData, fromVal: value })
              }
              selectFromValue={formData.fromCurr}
              selectFromOnChange={(currency) =>
                setFormData({ ...formData, fromCurr: currency })
              }
              selectToValue={formData.toCurr}
              selectToOnChange={(currency) =>
                setFormData({ ...formData, toCurr: currency })
              }
            />
          </span>
          <span>
            <Button onClick={() => handleConvertClick()}>Convert</Button>
            <a
              className="converter-box__historicalToggle"
              onClick={toggleShowHistorical}
            >
              Use historical data
            </a>
          </span>
          {historical.isShown && (
            <HistoricalBox
              onDateChange={onDateRangeChange}
              defaultValue={[
                moment(historical.dateStart, "YYYY-MM-DD"),
                moment(historical.dateEnd, "YYYY-MM-DD"),
              ]}
              onSubmit={handleHistoricalDataClick}
            />
          )}
          <Divider>Result</Divider>
          <p className="converter-box__result">{resultMessage}</p>
        </div>
      );
    default:
      return <Spin size="large" />;
  }
};

export default ConverterBox;
