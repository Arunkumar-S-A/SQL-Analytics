import { useEffect, useState } from "react";
import { getRiskData } from "../api/risk.api";
import DataTable from "../components/DataTable";
import RadialRiskChart from "../components/Charts/RadialRiskChart";

const TransactionAnalytics = () => {
  const [risk, setRisk] = useState([]);

  useEffect(() => {
    getRiskData().then(setRisk);
  }, []);

  // 🔎 Generate Insights
  const generateInsights = () => {
    if (!risk.length) return null;

    const grouped = {};
    risk.forEach((item) => {
      grouped[item.risk_type] = (grouped[item.risk_type] || 0) + 1;
    });

    const total = risk.length;

    const descriptions = {
      SPIKE:
        "Unusual transaction amounts significantly higher than user's average spending behavior.",
      HIGH_FREQUENCY:
        "Multiple transactions performed within a short time window indicating possible automated or suspicious activity.",
      ODD_HOUR:
        "Transactions occurring between midnight and early morning hours which may indicate abnormal behavior.",
      DORMANT_REACTIVATION:
        "User resumed activity after long inactivity gap which could indicate account takeover risk.",
      RETRY_SUCCESS:
        "Failed transactions immediately followed by success, potentially indicating brute-force attempts.",
    };

    return (
      <div style={{ marginBottom: "30px" }}>
        <h3>Key Risk Insights</h3>
        <p><strong>Total Risk Events:</strong> {total}</p>

        {Object.keys(grouped).map((type) => (
          <div
            key={type}
            style={{
              marginTop: "15px",
              padding: "15px",
              borderRadius: "10px",
              background: "#f3f4f6",
            }}
          >
            <strong>{type}</strong> — {grouped[type]} cases
            <p style={{ marginTop: "5px", fontSize: "14px" }}>
              {descriptions[type]}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Transaction Analytics</h2>

      {/* 🔵 Radial Chart */}
      <RadialRiskChart data={risk} />

      {/* 🧠 Insight Section */}
      {generateInsights()}

      {/* 📊 Data Table */}
      <div style={{ marginTop: "40px" }}>
        <DataTable
          columns={["user_id", "transaction_id", "risk_type"]}
          data={risk}
        />
      </div>
    </div>
  );
};

export default TransactionAnalytics;
