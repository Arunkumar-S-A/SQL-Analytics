import { useEffect, useState } from "react";
import { getSummary } from "../api/analytics.api";
import SummaryCard from "../components/SummaryCard";

const Dashboard = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getSummary().then(setSummary);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard Overview</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <SummaryCard title="Total Users" value={summary.total_users} />
        <SummaryCard title="Total Transactions" value={summary.total_transactions} />
        <SummaryCard title="Total Revenue" value={`₹${summary.total_revenue}`} />
      </div>
    </div>
  );
};

export default Dashboard;
