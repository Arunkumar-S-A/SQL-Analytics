import { useEffect, useState } from "react";
import { getRiskData } from "../api/risk.api";
import DataTable from "../components/DataTable";

const TransactionAnalytics = () => {
  const [risk, setRisk] = useState([]);

  useEffect(() => {
    getRiskData().then(setRisk);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Transaction Analytics</h2>

      <DataTable
        columns={["user_id", "transaction_id", "risk_type"]}
        data={risk}
      />
    </div>
  );
};

export default TransactionAnalytics;
