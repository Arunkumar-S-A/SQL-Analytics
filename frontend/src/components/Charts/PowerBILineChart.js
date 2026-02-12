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
 
const baseColors = [
  "#7c3aed", // Purple
  "#22c55e", // Green
  "#f97316", // Orange
  "#06b6d4", // Cyan
  "#ef4444"  // Red
];
 
const PowerBILineChart = ({ labels, values, title }) => {
  const data = {
    labels,
    datasets: Array.isArray(values[0])
      ? values.map((datasetValues, index) => ({
          label: `${title} ${index + 1}`,
          data: datasetValues,
          borderColor: baseColors[index % baseColors.length],
          fill: true,
          tension: 0.45,
          pointRadius: 4,
          pointBackgroundColor: baseColors[index % baseColors.length],
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
 
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(
              0,
              baseColors[index % baseColors.length] + "66"
            ); // stronger top
            gradient.addColorStop(
              1,
              baseColors[index % baseColors.length] + "00"
            ); // transparent bottom
            return gradient;
          }
        }))
      : [
          {
            label: title,
            data: values,
            borderColor: baseColors[0],
            fill: true,
            tension: 0.45,
            pointRadius: 4,
            pointBackgroundColor: baseColors[0],
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return null;
 
              const gradient = ctx.createLinearGradient(
                0,
                chartArea.top,
                0,
                chartArea.bottom
              );
              gradient.addColorStop(0, baseColors[0] + "66");
              gradient.addColorStop(1, baseColors[0] + "00");
              return gradient;
            }
          }
        ]
  };
 
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000 },
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#f8fafc",
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return `₹ ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#475569" }
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.2)"
        },
        ticks: {
          color: "#475569",
          callback: function (value) {
            return "₹ " + value.toLocaleString();
          }
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
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
      }}
>
<Line data={data} options={options} />
</div>
  );
};
 
export default PowerBILineChart;