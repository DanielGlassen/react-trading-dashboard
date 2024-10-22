interface StockData {
    date: string; // 'YYYY-MM-DD'
    underlying_open: number;
    underlying_high: number;
    underlying_low: number;
    underlying_close: number;
    underlying_last_trade_price: number;
    implied_underlying_mid: number;
  }