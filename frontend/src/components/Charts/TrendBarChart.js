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

// ✅ Soft Shadow Plugin
ChartJS.register({
  id: "shadowPlugin",
  beforeDatasetDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
  },
  afterDatasetDraw(chart) {
    chart.ctx.restore();
  }
});

const WINDOW_SIZE = 30;

// ✅ Vibrant Modern Palette
const generateColors = (count) => {
  const palette = [
    "#ff4d6d", // neon red
    "#ff9f1c", // vibrant orange
    "#2ec4b6", // aqua
    "#4361ee", // electric blue
    "#f72585", // hot pink
    "#7209b7", // vivid purple
    "#4cc9f0", // bright cyan
    "#06d6a0", // neon green
    "#ff006e"  // magenta
  ];

  return Array.from({ length: count }, (_, i) =>
    palette[i % palette.length]
  );
};

const TrendBarChart = ({ labels = [], values = [], title }) => {
  const total = labels.length;
  const safeWindow = Math.min(WINDOW_SIZE, total);

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, [labels]);

  const endIndex = Math.min(startIndex + safeWindow, total);

  const visibleLabels = useMemo(
    () => labels.slice(startIndex, endIndex),
    [labels, startIndex, endIndex]
  );

  const visibleValues = useMemo(
    () => values.slice(startIndex, endIndex),
    [values, startIndex, endIndex]
  );

  const data = useMemo(() => ({
    labels: visibleLabels,
    datasets: [
      {
        label: title,
        data: visibleValues,
        backgroundColor: generateColors(visibleValues.length),

        // ✅ Thicker Bars
        barThickness: 32,
        borderRadius: 10,

        // ✅ Hover Glow Effect
        hoverBorderColor: "#111",
        hoverBorderWidth: 2
      }
    ]
  }), [visibleLabels, visibleValues, title]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    layout: {
      padding: 12
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
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) =>
            `₹ ${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#333",
          font: {
            weight: "500"
          }
        }
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.08)"
        },
        ticks: {
          color: "#333",
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
      <div
        style={{
          height: "340px",
          position: "relative"
        }}
      >
        <Bar data={data} options={options} />
      </div>

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
              padding: "6px 14px",
              fontWeight: "500",
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
              padding: "6px 14px",
              fontWeight: "500",
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
