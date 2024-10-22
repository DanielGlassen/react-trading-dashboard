import React from 'react';
import { calculateMaxProfit, MaxProfitResult } from '../utils/calculateMaxProfit';
import dayjs from 'dayjs';
import Card from './Card';

interface MaxProfitProps {
  data: StockData[];
}

const MaxProfit: React.FC<MaxProfitProps> = ({ data }) => {
  const result: MaxProfitResult | null = calculateMaxProfit(data);

  if (!result) {
    return (
      <Card>
        <p className="text-yellow-500">Not enough data to calculate maximum profit.</p>
      </Card>
    );
  }

  const { maxProfit, buyDate, sellDate } = result;

  if (maxProfit === 0) {
    return (
      <Card>
        <p className="text-gray-500">No profitable buy and sell dates found in the selected range.</p>
      </Card>
    );
  }

  return (
    <Card className="hover:bg-gray-50 transition">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Maximum Profit</h2>
      <p className="text-2xl font-bold text-green-600 mb-2">${maxProfit.toLocaleString()}</p>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div>
          <span className="font-medium text-gray-700">Buy Date:</span>
          <p className="text-gray-900">{dayjs(buyDate).format('MMMM DD, YYYY')}</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="font-medium text-gray-700">Sell Date:</span>
          <p className="text-gray-900">{dayjs(sellDate).format('MMMM DD, YYYY')}</p>
        </div>
      </div>
    </Card>
  );
};

export default MaxProfit;
