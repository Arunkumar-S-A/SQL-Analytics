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

export const getMonthlyTotalSpend = async () => {
  const [rows] = await pool.query(`
    SELECT 
      DATE_FORMAT(transaction_time, '%Y-%m-01') AS month_start,
      SUM(amount) AS total_spent
    FROM transactions
    WHERE status = 'SUCCESS'
    GROUP BY month_start
    ORDER BY month_start ASC
  `);

  return rows;
};

export const getWeeklyTotalSpend = async () => {
  const [rows] = await pool.query(`
    SELECT
      DATE(transaction_time - INTERVAL WEEKDAY(transaction_time) DAY) AS week_start,
      SUM(amount) AS total_spent
    FROM transactions
    WHERE status = 'SUCCESS'
    GROUP BY week_start
    ORDER BY week_start ASC
  `);

  return rows;
};