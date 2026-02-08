import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM transactions ORDER BY transaction_time DESC LIMIT 100"
  );
  res.json(rows);
});

export default router;
