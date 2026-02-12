import db from "../config/db.js";

import {
  fetchWeeklySpend,
  fetchMonthlySpend,
  fetchUserRankings,
  getCategorySpendingRank,
  getMonthlyTotalSpend,
  getWeeklyTotalSpend
} from "../services/analytics.service.js";

export const getWeeklySpend = async (req, res) => {
  const data = await fetchWeeklySpend();
  res.json(data);
};

export const getMonthlySpend = async (req, res) => {
  const data = await fetchMonthlySpend();
  res.json(data);
};

export const getUserRankings = async (req, res) => {
  const data = await fetchUserRankings();
  res.json(data);
};

export const fetchMonthlyTotalSpend = async (req, res) => {
  try {
    const data = await getMonthlyTotalSpend();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching monthly spend" });
  }
};

export const fetchWeeklyTotalSpend = async (req, res) => {
  try {
    const data = await getWeeklyTotalSpend();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching weekly spend" });
  }
}

export const getSummary = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT COUNT(*) AS total_users FROM users"
    );

    const [transactions] = await db.query(
      "SELECT COUNT(*) AS total_transactions FROM transactions"
    );

    const [revenue] = await db.query(
      "SELECT IFNULL(SUM(amount),0) AS total_revenue FROM transactions"
    );

    res.json({
      total_users: users[0].total_users,
      total_transactions: transactions[0].total_transactions,
      total_revenue: parseFloat(revenue[0].total_revenue)
    });

  } catch (error) {
    console.error("Summary Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const fetchCategorySpendingRank = async (req, res) => {
  try {
    const data = await getCategorySpendingRank();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching category analytics" });
  }
};

