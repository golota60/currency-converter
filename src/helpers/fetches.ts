import moment from "moment";

const URI = "https://api.exchangeratesapi.io";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export interface GetLatestCurrenciesResponse {
  rates: {};
  base: string;
  date: string;
}

export const getLatestCurrencies = async (
  baseCurrency: string = "EUR"
): Promise<GetLatestCurrenciesResponse> => {
  const req = await fetch(`${URI}/latest?base=${baseCurrency}`, {
    cache: "no-cache",
  });
  const data: GetLatestCurrenciesResponse = await req.json();
  return data;
};

export const getCurrenciesByDate = async (
  baseCurrency: string = "EUR",
  date: string = moment().format("YYYY-MM-DD")
) => {
  const req = await fetch(`${URI}/${date}?base=${baseCurrency}`, {
    cache: "no-cache",
  });
  const data: GetLatestCurrenciesResponse = await req.json();
  return data;
};
