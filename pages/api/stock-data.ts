import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getAccessToken } from '../../utils/token';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol, date } = req.query;

  if (!symbol || !date) {
    return res.status(400).json({ error: 'Missing symbol or date parameter' });
  }

  try {
    const accessToken = await getAccessToken();
    const response = await axios.get<APIResponse>(
      UNDERLYING_QUOTES,
      {
        params: {
          symbols: symbol,
          date: date,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data[0];
    console.log("🚀 ~ handler ~ data:", data)

    const stockData: StockData = {
      date: date as string,
      ...data
    };

    res.status(200).json(stockData);
  } catch (error: any) {
    console.error(`Error fetching data for ${symbol} on ${date}:`, error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
}
