import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import InputForm from '../components/inputForm/InputForm';
import { fetchStockDataRange} from '../utils/fetchStockDataRange';
import LatestPrice from '../components/LatestPrice';
import MaxProfit from '../components/MaxProfit';
import MetricsDisplay from '../components/MetricsDisplay';
import Card from '../components/Card';

const CandlestickChart = dynamic(() => import('../components/CandlestickChart'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

const Home: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [symbol, setSymbol] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (inputSymbol: string, startDate: string, endDate: string) => {
    setSymbol(inputSymbol);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStockDataRange(inputSymbol, startDate, endDate);
      if (data.length < 10) {
        throw new Error('Please select a date range with at least 10 trading days.');
      }
      setStockData(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Stock Dashboard</h1>
        <Card>
          <InputForm onSubmit={handleFormSubmit} />
        </Card>

        {loading && <p className="mt-4 text-center text-gray-700">Loading data...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {stockData.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <LatestPrice symbol={symbol} />
            </Card>
            <Card className="md:col-span-2 lg:col-span-3">
              <CandlestickChart data={stockData} />
            </Card>
            <Card>
              <MaxProfit data={stockData} />
            </Card>
            <Card>
              <MetricsDisplay />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
