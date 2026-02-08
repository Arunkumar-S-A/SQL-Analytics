const SummaryCard = ({ title, value }) => {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    borderRadius: "8px",
    background: "#f5f5f5",
    minWidth: "180px"
  }
};

export default SummaryCard;
