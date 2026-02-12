import {
  fetchWeeklySpend,
  fetchMonthlySpend,
  fetchUserRankings,
  getCategorySpendingRank
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

import {
  getMonthlyTotalSpend,
  getWeeklyTotalSpend
} from "../services/analytics.service.js";

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

