import pool from "../config/db.js";

export const fetchWeeklySpend = async () => {
  const [rows] = await pool.query("SELECT * FROM weekly_user_spend");
  return rows;
};

export const fetchMonthlySpend = async () => {
  const [rows] = await pool.query("SELECT * FROM monthly_user_spend");
  return rows;
};

export const fetchUserRankings = async () => {
  const [rows] = await pool.query("SELECT * FROM user_spending_rank");
  return rows;
};
