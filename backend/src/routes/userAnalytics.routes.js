import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/*
  1️⃣ Get all users with summary
*/
router.get("/", async (req, res) => {
  const [rows] = await pool.query(`
    SELECT 
      u.user_id,
      u.full_name,
      u.email,
      u.city,
      COUNT(t.transaction_id) AS total_transactions
    FROM users u
    LEFT JOIN transactions t ON u.user_id = t.user_id
    GROUP BY u.user_id
    ORDER BY u.created_at DESC
  `);

  res.json(rows);
});

/*
  2️⃣ Get transactions for specific user
*/
router.get("/:userId/transactions", async (req, res) => {
  const { userId } = req.params;

  const [rows] = await pool.query(`
    SELECT *
    FROM transactions
    WHERE user_id = ?
    ORDER BY transaction_time DESC
  `, [userId]);

  res.json(rows);
});

/*
  3️⃣ Get anomalies for specific user
*/
router.get("/:userId/anomalies", async (req, res) => {
  const { userId } = req.params;

  const [rows] = await pool.query(`
    SELECT *
    FROM unified_risk_indicators
    WHERE user_id = ?
  `, [userId]);

  res.json(rows);
});

/*
  4️⃣ Get daily & monthly pattern
*/
router.get("/:userId/pattern", async (req, res) => {
  const { userId } = req.params;

  const [daily] = await pool.query(`
    SELECT 
      DATE(transaction_time) AS day,
      SUM(amount) AS total
    FROM transactions
    WHERE user_id = ?
      AND status = 'SUCCESS'
    GROUP BY day
    ORDER BY day
  `, [userId]);

  const [monthly] = await pool.query(`
    SELECT 
      DATE_FORMAT(transaction_time, '%Y-%m') AS month,
      SUM(amount) AS total
    FROM transactions
    WHERE user_id = ?
      AND status = 'SUCCESS'
    GROUP BY month
    ORDER BY month
  `, [userId]);

  res.json({ daily, monthly });
});

export default router;
