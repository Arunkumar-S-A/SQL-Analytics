import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const UserPatternChart = ({ daily = [], monthly = [] }) => {
  const formattedDaily = daily.map((d) => ({
    ...d,
    total: Number(d.total),
    day: new Date(d.day).toLocaleDateString(),
  }));

  const formattedMonthly = monthly.map((m) => ({
    ...m,
    total: Number(m.total),
  }));

  return (
    <div style={{ width: "100%", height: "400px" }}>
      
      <h4 style={{ marginBottom: "10px" }}>📅 Daily Spending Trend</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedDaily}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>

      <h4 style={{ marginTop: "30px", marginBottom: "10px" }}>
        📆 Monthly Spending Trend
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={formattedMonthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default UserPatternChart;
