import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const colors = [
  "#7c3aed",
  "#22c55e",
  "#f97316",
  "#06b6d4",
  "#ef4444",
  "#eab308",
  "#14b8a6",
  "#3b82f6",
  "#ec4899"
];

const PowerBIHorizontalBarChart = ({ labels, values, title }) => {

  // 🔥 Sort descending for ranking
  const combined = labels.map((label, index) => ({
    label,
    value: values[index]
  })).sort((a, b) => b.value - a.value);

  const sortedLabels = combined.map((item, index) => 
    `#${index + 1} ${item.label}`
  );

  const sortedValues = combined.map(item => item.value);

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: title,
        data: sortedValues,
        backgroundColor: sortedValues.map(
          (_, i) => colors[i % colors.length]
        ),
        borderRadius: 12,
        barThickness: 28
      }
    ]
  };

  const options = {
    indexAxis: "y", // 🔥 Makes it Horizontal
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeOutQuart"
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        cornerRadius: 8,
        padding: 10,
        callbacks: {
          label: function (context) {
            return `₹ ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: "rgba(148,163,184,0.2)"
        },
        ticks: {
          color: "#475569",
          callback: function (value) {
            return "₹ " + value.toLocaleString();
          }
        }
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#334155",
          font: { size: 13 }
        }
      }
    }
  };

  return (
    <div
      style={{
        height: "320px",
        width: "100%",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        overflowY: "auto"
      }}
    >
      <div
        style={{
          minHeight: `${sortedLabels.length * 45}px`
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PowerBIHorizontalBarChart;
