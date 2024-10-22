import React from 'react';
import Card from './Card';

interface LatestPriceProps {
  symbol: string;
}

const LatestPrice: React.FC<LatestPriceProps> = ({ symbol }) => {
  const latestPrice = 150.25;
  const priceChange = 1.5;
  const priceChangePercent = 1.0; 

  return (
    <Card className="flex flex-col md:flex-row items-center justify-between hover:bg-gray-50 transition">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{symbol} Latest Price</h2>
        <p className="text-3xl font-bold text-gray-900">${latestPrice.toLocaleString()}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <p className="text-green-600">
          ▲ {priceChange} ({priceChangePercent}%)
        </p>
      </div>
    </Card>
  );
};

export default LatestPrice;
