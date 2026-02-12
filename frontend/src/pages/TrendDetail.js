import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
//import DataTable from "../components/DataTable";
import InsightsPanel from "./InsightsPanel";
import { getWeeklyTotal, getMonthlyTotal, getRankings } from "../api/analytics.api";
import TrendBarChart from "../components/charts/TrendBarChart";
import TrendLineChart from "../components/charts/TrendLineChart";
import TrendHorizontalChart from "../components/charts/TrendHorizontalChart";
import PowerBILineChart from  "../components/charts/PowerBILineChart";
import PowerBIBarChart from    "../components/charts/PowerBIBarChart";
const TrendDetail = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      let result = [];
      if (type === "weekly") result = await getWeeklyTotal();
      if (type === "monthly") result = await getMonthlyTotal();
      if (type === "ranking") result = await getRankings();

      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [type]);

  const renderChart = () => {
    if (!data.length) return null;

    // WEEKLY → Line Chart
    if (type === "weekly") {
      return (
        <PowerBILineChart
          title="Weekly Spending Trend"
          labels={data.map(d => {
            const start = new Date(d.week_start);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);

            return `${start.toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric"
            })} - ${end.toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric"
            })}`;
          })}
          values={data.map(d => d.total_spent)}
        />


      );
    }

    // MONTHLY → Bar Chart
    if (type === "monthly") {
      return (
        <TrendBarChart
          title="Monthly Spending Trend"
          labels={data.map(d =>
            new Date(d.month_start).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric"
            })
          )}
          values={data.map(d => d.total_spent)}
        />

      );
    }

    // RANKING → Bar Chart
    if (type === "ranking") {
      return (
        <TrendHorizontalChart
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
      <h3
        className="mb-4 text-center"
        style={{ paddingLeft: "40px" }}
      >
        {type
          .replace("-", " ")
          .replace(/\b\w/g, char => char.toUpperCase())}{" "}
        Analysis
      </h3>


      {/* Chart Section */}
      <Card className="shadow-lg border-0 p-4 mb-4">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          renderChart()
        )}
      </Card>

      {/* Insights Section */}
      <Card className="shadow-sm border-0 p-3">
        <InsightsPanel type={type} data={data} />
      </Card>

    </Container>
  );
};

export default TrendDetail;
