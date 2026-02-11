import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  SPIKE: "#ef4444",
  HIGH_FREQUENCY: "#f59e0b",
  ODD_HOUR: "#8b5cf6",
  DORMANT_REACTIVATION: "#10b981",
  RETRY_SUCCESS: "#3b82f6",
};

const RadialRiskChart = ({ data }) => {
  const grouped = {};

  data.forEach((item) => {
    grouped[item.risk_type] = (grouped[item.risk_type] || 0) + 1;
  });

  const chartData = Object.keys(grouped).map((key, index) => ({
    name: key,
    value: grouped[key],
    fill: COLORS[key] || "#8884d8",
  }));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <RadialBarChart
          innerRadius="20%"
          outerRadius="90%"
          data={chartData}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            label={{ position: "insideStart", fill: "#fff" }}
          />
          <Legend />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialRiskChart;
