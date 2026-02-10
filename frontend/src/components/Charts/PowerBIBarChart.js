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

const PowerBIBarChart = ({ labels, values, title }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: "rgba(37, 99, 235, 0.85)",
        hoverBackgroundColor: "rgba(96, 165, 250, 0.95)",
        borderRadius: 10,
        barThickness: 40
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeOutQuart"
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#475569",
          font: { size: 12 }
        }
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.2)"
        },
        ticks: {
          color: "#475569"
        }
      }
    }
  };

  return (
    <div style={{ height: "420px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PowerBIBarChart;
