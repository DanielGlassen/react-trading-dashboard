import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Metrics } from '@/utils/metrics';

const MetricsDisplay = () => {
  const [metrics, setMetrics] = useState<{label: string, value: string | number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentMetrics = Metrics.getMetrics()
      const metrics = [
        { label: 'API Requests', value: currentMetrics.requestCount },
        { label: 'Errors', value: currentMetrics.errorCount },
        { label: 'Processing Time', value: `${currentMetrics.averageProcessingTime} ms` },
      ];
      setMetrics(metrics);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentMetrics]);
  return (
    <Card className="hover:bg-gray-50 transition">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Application Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
            <p className="text-gray-600">{metric.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MetricsDisplay;
