import {
  fetchWeeklySpend,
  fetchMonthlySpend,
  fetchUserRankings
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
