import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Decimation
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo, useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Decimation
);

const WINDOW_SIZE = 100;

const TrendLineChart = ({
  labels = [],
  values = [],
  title = "Trend"
}) => {

  const total = labels.length;
  const safeWindow = Math.min(WINDOW_SIZE, total);

  const [startIndex, setStartIndex] = useState(0);

  const endIndex = startIndex + safeWindow;

  // 🔥 Reset index if data changes
  useEffect(() => {
    setStartIndex(0);
  }, [total]);

  const visibleLabels = useMemo(() =>
    labels.slice(startIndex, endIndex),
    [labels, startIndex, endIndex]
  );

  const visibleValues = useMemo(() =>
    values.slice(startIndex, endIndex),
    [values, startIndex, endIndex]
  );

  const data = useMemo(() => ({
    labels: visibleLabels,
    datasets: [
      {
        label: title,
        data: visibleValues,
        borderColor: "#7c3aed",
        tension: 0.4,
        pointRadius: 0,
        fill: false
      }
    ]
  }), [visibleLabels, visibleValues, title]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
      decimation: {
        enabled: true,
        algorithm: "min-max"
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `₹ ${Number(context.raw).toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        ticks: { autoSkip: true }
      },
      y: {
        ticks: {
          callback: (value) =>
            "₹ " + Number(value).toLocaleString()
        }
      }
    }
  };

  const canGoLeft = startIndex > 0;
  const canGoRight = endIndex < total;

  const handlePrevious = () => {
    if (!canGoLeft) return;
    setStartIndex(prev =>
      Math.max(prev - safeWindow, 0)
    );
  };

  const handleNext = () => {
    if (!canGoRight) return;
    setStartIndex(prev =>
      Math.min(prev + safeWindow, total - safeWindow)
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* Chart Container */}
      <div style={{ flex: 1 }}>
        <Line data={data} options={options} />
      </div>

      {/* Controls (ALWAYS visible) */}
      {total > safeWindow && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "12px"
          }}
        >
          <button
            onClick={handlePrevious}
            disabled={!canGoLeft}
          >
            ◀ Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoRight}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default TrendLineChart;
