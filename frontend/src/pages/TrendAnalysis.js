import { useEffect, useState } from "react";
import { getWeekly, getMonthly } from "../api/analytics.api";
import DataTable from "../components/DataTable";

const TrendAnalysis = () => {
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    getWeekly().then(setWeekly);
    getMonthly().then(setMonthly);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Trend Analysis</h2>

      <h3>Weekly</h3>
      <DataTable
        columns={["user_id", "week_start", "total_spent"]}
        data={weekly}
      />

      <h3 style={{ marginTop: "30px" }}>Monthly</h3>
      <DataTable
        columns={["user_id", "month_start", "total_spent"]}
        data={monthly}
      />
    </div>
  );
};

export default TrendAnalysis;
