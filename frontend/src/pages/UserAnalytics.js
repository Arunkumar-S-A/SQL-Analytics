import { useEffect, useState } from "react";
import { getWeekly, getMonthly, getRankings } from "../api/analytics.api";
import DataTable from "../components/DataTable";

const UserAnalytics = () => {
  const [weekly, setWeekly] = useState([]);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    getWeekly().then(setWeekly);
    getRankings().then(setRankings);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>User Analytics</h2>

      <h3>Weekly Spending</h3>
      <DataTable
        columns={["user_id", "week_start", "total_spent"]}
        data={weekly}
      />

      <h3 style={{ marginTop: "30px" }}>User Rankings</h3>
      <DataTable
        columns={["user_id", "total_spent", "rank"]}
        data={rankings}
      />
    </div>
  );
};

export default UserAnalytics;
