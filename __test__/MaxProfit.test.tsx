import React from 'react';
import { render, screen } from '@testing-library/react';
import MaxProfit from '../components/MaxProfit';

describe('MaxProfit', () => {
  it('displays maximum profit correctly', () => {
    const data: StockData[] = [
      { date: '2023-01-01', underlying_open: 100, underlying_high: 110, underlying_low: 90, underlying_close: 105, underlying_last_trade_price: 105 },
      { date: '2023-01-02', underlying_open: 105, underlying_high: 115, underlying_low: 95, underlying_close: 110, underlying_last_trade_price: 110 },
      { date: '2023-01-03', underlying_open: 110, underlying_high: 120, underlying_low: 100, underlying_close: 115, underlying_last_trade_price: 115 },
    ];

    render(<MaxProfit data={data} />);
    expect(screen.getByText(/Buy on: 2023-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/Sell on: 2023-01-03/i)).toBeInTheDocument();
    expect(screen.getByText(/Profit: \$15.00/i)).toBeInTheDocument();
  });

  it('handles insufficient data', () => {
    const data: StockData[] = [
      { date: '2023-01-01', underlying_open: 100, underlying_high: 110, underlying_low: 90, underlying_close: 105, underlying_last_trade_price: 105 },
    ];

    render(<MaxProfit data={data} />);
    expect(screen.getByText(/Not enough data to calculate profit./i)).toBeInTheDocument();
  });
});
