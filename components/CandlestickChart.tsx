import React from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import Card from './Card';

interface CandlestickChartProps {
  data: StockData[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  if (data.length === 0) {
    return <p>No data available for the selected range.</p>;
  }

  const sortedData = [...data].sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

  const series = [{
    data: sortedData.map(d => ({
      x: dayjs(d.date).format('YYYY-MM-DD'),
      y: [d.underlying_open, d.underlying_high, d.underlying_low, d.underlying_close],
    })),
  }];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
      background: '#f9fafb',
    },
    title: {
      text: `Candlestick Chart for ${sortedData[0].symbol || 'Stock'}`,
      align: 'left',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#374151',
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function(val: string) {
          return dayjs(val).format('MMM DD');
        },
      },
      title: {
        text: 'Date',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#6b7280',
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      title: {
        text: 'Price ($)',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#6b7280',
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: {
        format: 'yyyy-MM-dd',
      },
      y: {
        formatter: function(val: number[]) {
          console.log(`val`,val)
          return `
            Open: $${val[0].toFixed(2)}<br/>
            High: $${val[1].toFixed(2)}<br/>
            Low: $${val[2].toFixed(2)}<br/>
            Close: $${val[3].toFixed(2)}
          `;
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#16a34a',
          downward: '#dc2626',
        },
      },
    },
    stroke: {
      width: 1,
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 3,
    },
    responsive: [{
      breakpoint: 1000,
      options: {
        chart: {
          height: 300,
        },
      },
    }, {
      breakpoint: 600,
      options: {
        chart: {
          height: 250,
        },
      },
    }],
  };

  return (
    <Card className="transition transform hover:scale-105">
      <ReactApexChart options={options} series={series} type="candlestick" height={350} />
    </Card>
  );
};

export default CandlestickChart;
