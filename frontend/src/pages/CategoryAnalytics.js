import { useEffect, useState } from "react";
import { getCategorySpend } from "../api/analytics.api";
import DataTable from "../components/DataTable";
import CategoryPieChart from "../components/charts/CategoryPieChart";

const CategoryAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCategorySpend().then(setData);
  }, []);

  return (
  <div style={{ padding: "10px" }}>
    <h2 style={{ marginBottom: "20px" }}>
      Category Analytics
    </h2>

    {/* Chart Wrapper */}
    <div style={{ marginBottom: "30px" }}>
      <CategoryPieChart data={data} />
    </div>

    {/* Table */}
    <DataTable
      columns={["category_name", "total_spent", "spending_rank"]}
      data={data}
    />
  </div>
);
};

export default CategoryAnalytics;
