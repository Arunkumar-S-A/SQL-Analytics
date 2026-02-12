import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ data = [] }) => {

  const totalAmount = useMemo(() =>
    data.reduce((sum, item) => sum + Number(item.total_spent), 0),
    [data]
  );

  const chartData = useMemo(() => ({
    labels: data.map(item => item.category_name),
    datasets: [
      {
        data: data.map(item => item.total_spent),
        backgroundColor: [
          "#3b82f6", // Blue
          "#10b981", // Green
          "#f59e0b", // Amber
          "#ef4444", // Red
          "#8b5cf6"  // Violet
        ],
        borderWidth: 1
      }
    ]
  }), [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right"
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = Number(context.raw);
            const percentage = ((value / totalAmount) * 100).toFixed(2);
            return `${context.label}: ₹ ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: "55%" // 🔥 Makes it donut instead of pie
  };

  return (
    <div style={{ height: "380px", width: "100%" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CategoryPieChart;
