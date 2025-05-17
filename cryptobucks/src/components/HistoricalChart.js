import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  Title
} from 'chart.js';
import { fetchHistoricalData } from '../api';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  Title
);

const HistoricalChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(30);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function loadData() {
      const prices = await fetchHistoricalData(coinId, days);
      if (prices && Array.isArray(prices)) {
        setChartData({
          labels: prices.map(p => new Date(p[0]).toLocaleDateString()),
          datasets: [{
            label: `${coinId.toUpperCase()} Price (USD)`,
            data: prices.map(p => p[1]),
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4
          }]
        });
      }
    }
    loadData();
  }, [coinId, days]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,        // it display legend
        position: 'top',     //top,bottom,left,right
        labels: {
          color: darkMode ? '#f1f1f1' : '#222',
          font: { size: 13, weight: 'bold' }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {context.parsed.y.toLocaleString()},
        },
      },
      title: {
        display: true,
        text: `Price Chart - Last ${days} Days`,
        color: darkMode ? '#fff' : '#333',
        font: { size: 18, weight: 'bold' }
      }
    },
    scales: {
      x: {
        ticks: { color: darkMode ? '#aaa' : '#222' }
      },
      y: {
        ticks: { color: darkMode ? '#aaa' : '#222' }
      }
    }
  };

  const handleRangeChange = (e) => setDays(e.target.value);
  const toggleDark = () => setDarkMode(!darkMode);

  return (
    <div className="container my-4">
      <div className={`card shadow-sm ${darkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">{coinId.toUpperCase()} Price Chart</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={toggleDark}>
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <label className="form-label fw-bold">Select Range:</label>
            <select className="form-select w-50" value={days} onChange={handleRangeChange}>
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={90}>90 Days</option>
              <option value={180}>6 Months</option>
              <option value={365}>1 Year</option>
            </select>
          </div>

          <div className="bg-white p-2 rounded">
            {!chartData ? (
              <p>Loading chart...</p>
            ) : (
              <Line data={chartData} options={options} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalChart;