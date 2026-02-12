import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Decimation
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo, useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Decimation
);

const WINDOW_SIZE = 30; // bars per view

const TrendBarChart = ({ labels = [], values = [], title }) => {

  const total = labels.length;
  const safeWindow = Math.min(WINDOW_SIZE, total);

  const [startIndex, setStartIndex] = useState(0);

  // Reset index if dataset changes
  useEffect(() => {
    setStartIndex(0);
  }, [labels]);

  const endIndex = Math.min(startIndex + safeWindow, total);

  const visibleLabels = useMemo(() => {
    return labels.slice(startIndex, endIndex);
  }, [labels, startIndex, endIndex]);

  const visibleValues = useMemo(() => {
    return values.slice(startIndex, endIndex);
  }, [values, startIndex, endIndex]);

  const data = useMemo(() => ({
    labels: visibleLabels,
    datasets: [
      {
        label: title,
        data: visibleValues,
        backgroundColor: "#7c3aed",
        borderRadius: 6,
        barThickness: 24
      }
    ]
  }), [visibleLabels, visibleValues, title]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    layout: {
      padding: 10
    },
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: { display: false },
      decimation: {
        enabled: true,
        algorithm: "min-max"
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `₹ ${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true
        }
      },
      y: {
        ticks: {
          callback: (value) =>
            "₹ " + value.toLocaleString()
        }
      }
    }
  }), []);

  const canGoLeft = startIndex > 0;
  const canGoRight = endIndex < total;

  const handleNext = () => {
    if (!canGoRight) return;
    setStartIndex(prev =>
      Math.min(prev + safeWindow, total - safeWindow)
    );
  };

  const handlePrevious = () => {
    if (!canGoLeft) return;
    setStartIndex(prev =>
      Math.max(prev - safeWindow, 0)
    );
  };

  return (
    <div style={{ width: "100%" }}>

      {/* Fixed Height Chart Container */}
      <div
        style={{
          height: "320px",
          position: "relative"
        }}
      >
        <Bar data={data} options={options} />
      </div>

      {/* Controls Section */}
      {total > safeWindow && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "15px"
          }}
        >
          <button
            onClick={handlePrevious}
            disabled={!canGoLeft}
            style={{
              padding: "6px 12px",
              cursor: canGoLeft ? "pointer" : "not-allowed"
            }}
          >
            ◀ Previous
          </button>

          <span style={{ fontSize: "14px", color: "#555" }}>
            Showing {startIndex + 1} – {endIndex} of {total}
          </span>

          <button
            onClick={handleNext}
            disabled={!canGoRight}
            style={{
              padding: "6px 12px",
              cursor: canGoRight ? "pointer" : "not-allowed"
            }}
          >
            Next ▶
          </button>
        </div>
      )}

    </div>
  );
};

export default TrendBarChart;
