import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";

import DataTable from "../components/DataTable";
import PowerBIBarChart from "../components/charts/PowerBIBarChart";
import PowerBILineChart from "../components/charts/PowerBILineChart";

import { getWeekly, getMonthly, getRankings } from "../api/analytics.api";

const TrendDetail = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (type === "weekly") getWeekly().then(setData);
    if (type === "monthly") getMonthly().then(setData);
    if (type === "ranking") getRankings().then(setData);
  }, [type]);

  const renderChart = () => {
    if (!data.length) return null;

    // WEEKLY → Line Chart
    if (type === "weekly") {
      return (
        <PowerBILineChart
          title="Weekly Spending Trend"
          labels={data.map(d => d.week_start)}
          values={data.map(d => d.total_spent)}
        />
      );
    }

    // MONTHLY → Bar Chart
    if (type === "monthly") {
      return (
        <PowerBIBarChart
          title="Monthly Spending Trend"
          labels={data.map(d => d.month_start)}
          values={data.map(d => d.total_spent)}
        />
      );
    }

    // RANKING → Bar Chart
    if (type === "ranking") {
      return (
        <PowerBIBarChart
          title="User Spending Ranking"
          labels={data.map(d => `User ${d.user_id}`)}
          values={data.map(d => d.total_spent)}
        />
      );
    }
  };

  return (
    <Container className="mt-4 mb-5">
      {/* Page Title */}
      <h3 className="text-center mb-4 text-capitalize">
        {type.replace("-", " ")} Analysis
      </h3>

      {/* Chart Section */}
      <Card className="shadow-lg border-0 p-4 mb-4">
        {renderChart()}
      </Card>

      {/* Table Section */}
      <Card className="shadow-sm border-0 p-3">
        <h6 className="mb-3 text-muted">Raw Data</h6>
        <DataTable
          columns={Object.keys(data[0] || {})}
          data={data}
        />
      </Card>
    </Container>
  );
};

export default TrendDetail;
