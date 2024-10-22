export interface StockData {
    date: string; // 'YYYY-MM-DD'
    underlying_open: number;
    underlying_high: number;
    underlying_low: number;
    underlying_close: number;
    underlying_last_trade_price: number;
  }
  
  export interface MaxProfitResult {
    maxProfit: number;
    buyDate: string;
    sellDate: string;
  }
  
  export const calculateMaxProfit = (data: StockData[]): MaxProfitResult | null => {
    if (data.length < 2) {
      return null;
    }
  
    let minPrice = data[0].underlying_open;
    let minDate = data[0].date;
    let maxProfit = data[1].underlying_open - minPrice;
    let buyDate = minDate;
    let sellDate = data[1].date;
  
    for (let i = 1; i < data.length; i++) {
      const currentPrice = data[i].underlying_open;
      const currentDate = data[i].date;
  
      const potentialProfit = currentPrice - minPrice;
  
      if (potentialProfit > maxProfit) {
        maxProfit = potentialProfit;
        buyDate = minDate;
        sellDate = currentDate;
      }
  
      if (currentPrice < minPrice) {
        minPrice = currentPrice;
        minDate = currentDate;
      }
    }
  
    if (maxProfit <= 0) {
      return {
        maxProfit: 0,
        buyDate: minDate,
        sellDate: minDate,
      };
    }
  
    return {
      maxProfit: parseFloat(maxProfit.toFixed(2)),
      buyDate,
      sellDate,
    };
  };
  