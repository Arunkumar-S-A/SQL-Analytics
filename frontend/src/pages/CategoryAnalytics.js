import { useEffect, useState } from "react";
import { getCategorySpend } from "../api/analytics.api";
import DataTable from "../components/DataTable";

const CategoryAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCategorySpend().then(setData);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Category Analytics</h2>

      <DataTable
        columns={["category_name", "total_spent"]}
        data={data}
      />
    </div>
  );
};

export default CategoryAnalytics;
