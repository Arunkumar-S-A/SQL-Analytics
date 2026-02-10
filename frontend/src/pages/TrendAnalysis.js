// import { useEffect, useState } from "react";
// import { getWeekly, getMonthly } from "../api/analytics.api";
// import DataTable from "../components/DataTable";

// const TrendAnalysis = () => {
//   const [weekly, setWeekly] = useState([]);
//   const [monthly, setMonthly] = useState([]);

//   useEffect(() => {
//     getWeekly().then(setWeekly);
//     getMonthly().then(setMonthly);
//   }, []);

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Trend Analysis</h2>

//       <h3>Weekly</h3>
//       <DataTable
//         columns={["user_id", "week_start", "total_spent"]}
//         data={weekly}
//       />

//       <h3 style={{ marginTop: "30px" }}>Monthly</h3>
//       <DataTable
//         columns={["user_id", "month_start", "total_spent"]}
//         data={monthly}
//       />
//     </div>
//   );
// };

// export default TrendAnalysis;


// new evelyn'S CODE:



import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./TrendAnalysis.css";

const trends = [
  {
    title: "Weekly Spending",
    description: "User-wise weekly spending trends",
    path: "weekly",
    bg: "gradient-blue"
  },
  {
    title: "Monthly Spending",
    description: "Monthly aggregated expenses",
    path: "monthly",
    bg: "gradient-green"
  },
  {
    title: "User Ranking",
    description: "Top users by total spend",
    path: "ranking",
    bg: "gradient-purple"
  }
];

const TrendAnalysis = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="trend-page">
      <h2 className="trend-title">📊 Trend Analytics</h2>

      <Row className="trend-grid">
        {trends.map((trend, idx) => (
          <Col key={idx} className="trend-col">
            <Card
              className={`trend-square ${trend.bg}`}
              onClick={() => navigate(`/trends/${trend.path}`)}
            >
              <Card.Body className="trend-content">
                <h3>{trend.title}</h3>
                <p>{trend.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TrendAnalysis;
