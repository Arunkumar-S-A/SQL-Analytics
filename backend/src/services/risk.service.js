import pool from "../config/db.js";

export const fetchAllRisks = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM unified_risk_indicators"
  );
  return rows;
};

export const fetchRiskByUser = async (userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM unified_risk_indicators WHERE user_id = ?",
    [userId]
  );
  return rows;
};
