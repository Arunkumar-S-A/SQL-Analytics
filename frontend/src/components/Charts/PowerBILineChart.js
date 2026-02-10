import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const PowerBILineChart = ({ labels, values, title }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.15)",
        fill: true,
        tension: 0.45,
        pointRadius: 5,
        pointBackgroundColor: "#7c3aed"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#f8fafc",
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#475569" }
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.25)"
        },
        ticks: { color: "#475569" }
      }
    }
  };

  return (
    <div style={{ height: "420px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PowerBILineChart;
