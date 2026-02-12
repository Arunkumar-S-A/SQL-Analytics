import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const baseColors = [
  "#7c3aed",
  "#22c55e",
  "#f97316",
  "#06b6d4",
  "#ef4444",
  "#eab308",
  "#14b8a6",
  "#3b82f6",
  "#ec4899",
  "#6366f1"
];

const TrendHorizontalChart = ({ labels, values, title }) => {

  // 🔥 Sort descending
  const { sortedLabels, sortedValues } = useMemo(() => {
    const combined = labels.map((label, index) => ({
      label,
      value: values[index]
    })).sort((a, b) => b.value - a.value);

    return {
      sortedLabels: combined.map((item, index) =>
        `#${index + 1} ${item.label}`
      ),
      sortedValues: combined.map(item => item.value)
    };
  }, [labels, values]);

  // 🔥 Generate dynamic colors
  const dynamicColors = useMemo(() => {
    return sortedValues.map((_, index) =>
      baseColors[index % baseColors.length]
    );
  }, [sortedValues]);

  const data = useMemo(() => ({
    labels: sortedLabels,
    datasets: [
      {
        label: title,
        data: sortedValues,
        backgroundColor: dynamicColors,
        borderRadius: 8,
        barThickness: 24
      }
    ]
  }), [sortedLabels, sortedValues, title, dynamicColors]);

  const options = useMemo(() => ({
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: false,

    plugins: {
      legend: { display: false },
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
          autoSkip: true,
          maxTicksLimit: 8,
          callback: (value) =>
            "₹ " + value.toLocaleString()
        }
      },
      y: {
        ticks: {
          autoSkip: false
        }
      }
    }
  }), []);

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
        overflowY: "auto",
        background: "#fff",
        padding: "15px",
        borderRadius: "12px"
      }}
    >
      <div
        style={{
          minHeight: `${sortedLabels.length * 35}px`
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TrendHorizontalChart;
