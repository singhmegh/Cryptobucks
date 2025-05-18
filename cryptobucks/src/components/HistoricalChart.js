import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  Title,
} from "chart.js";
import { fetchHistoricalData } from "../api";

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
          labels: prices.map((p) => new Date(p[0]).toLocaleDateString()),
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (USD)`,
              data: prices.map((p) => p[1]),
              borderColor: darkMode ? "#fff" : "#0d6efd",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(13,110,253,0.1)",
              fill: true,
              tension: 0.3,
              pointBackgroundColor: darkMode ? "#fff" : "#0d6efd",
              pointBorderWidth: 1,
              pointRadius: 3,
              pointHoverRadius: 6,
            },
          ],
        });
      }
    }
    loadData();
  }, [coinId, days, darkMode]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#f1f1f1" : "#111",
          font: {
            size: 13,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: `Price Chart - Last ${days} Days`,
        color: darkMode ? "#fff" : "#111",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => context.parsed.y.toLocaleString(),
        },
        backgroundColor: darkMode ? "#333" : "#fff",
        titleColor: darkMode ? "#fff" : "#111",
        bodyColor: darkMode ? "#fff" : "#111",
      },
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? "#444" : "#ccc",
        },
        ticks: {
          color: darkMode ? "#ccc" : "#111",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: darkMode ? "#444" : "#ccc",
        },
        ticks: {
          color: darkMode ? "#ccc" : "#111",
          font: {
            size: 12,
          },
        },
      },
    },
    layout: {
      padding: 10,
    },
  };

  return (
    <div className="container my-4">
      <div
        className={`card shadow-sm ${
          darkMode ? "bg-dark text-light" : "bg-white text-dark"
        }`}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{coinId.toUpperCase()} Price Chart</h5>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setDarkMode(!darkMode)}
            >
              Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <select
              className="form-select w-50"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            >
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={90}>90 Days</option>
              <option value={180}>6 Months</option>
              <option value={365}>1 Year</option>
            </select>
          </div>

          <div style={{ height: "400px" }}>
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
