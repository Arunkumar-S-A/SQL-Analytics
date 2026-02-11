const InsightCards = ({ data }) => {
  const total = data.length;
  const uniqueUsers = [...new Set(data.map(d => d.user_id))].length;

  return (
    <div className="insight-grid">
      <div className="card">
        <h3>{total}</h3>
        <p>Total Risk Events</p>
      </div>
      <div className="card">
        <h3>{uniqueUsers}</h3>
        <p>Impacted Users</p>
      </div>
    </div>
  );
};

export default InsightCards;
