import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { getAccessToken } from './token';


interface APIResponse {
  timestamp: string;
  symbol: string;
  implied_underlying_bid: number;
  implied_underlying_ask: number;
  implied_underlying_bid_size: number;
  implied_underlying_ask_size: number;
  implied_underlying_mid: number;
  implied_underlying_indicator: string;
  underlying_mid: number;
  underlying_last_trade_price: number;
  underlying_last_trade_size: number;
  underlying_bid: number;
  underlying_ask: number;
  underlying_bid_size: number;
  underlying_ask_size: number;
  underlying_open: number;
  underlying_high: number;
  underlying_low: number;
  underlying_close: number;
  underlying_prev_day_close: number;
  underlying_volume: number;
  iv30: number;
  iv30_change: number;
  iv30_change_percent: number;
  seq_no: number;
}

const API_BASE_URL = process.env.API_BASE_URL
const UNDERLYING_QUOTES = `${API_BASE_URL}/v1/delayed/allaccess/market/underlying-quotes`

export const fetchStockDataRange = async (
  symbol: string,
  startDate: string,
  endDate: string
): Promise<StockData[]> => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const dates: string[] = [];

  let current = start;
  while (current.isBefore(end) || current.isSame(end, 'day')) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'day');
  }

  const promises = dates.map(async (date) => {
    try {
      const response = await fetchStockData(symbol, date)
      console.log("🚀 ~ promises ~ response:", response)

      return response.data;
    } catch (error: any) {
      console.error(`Error fetching data for ${symbol} on ${date}:`, error.response?.data || error.message);
      return null;
    }
  });

  const results = await Promise.all(promises);
  return results.filter((data): data is StockData => data !== null);
};

export const fetchStockData = async (symbol: string, date: string): Promise<AxiosResponse<StockData>> => {
  return await axios.get<StockData>(`/api/stock-data`, {
    params: {
      symbol,
      date,
    },
  });
};