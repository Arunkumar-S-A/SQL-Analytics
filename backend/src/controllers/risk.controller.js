import {
  fetchAllRisks,
  fetchRiskByUser
} from "../services/risk.service.js";

export const getRiskIndicators = async (req, res) => {
  const data = await fetchAllRisks();
  res.json(data);
};

export const getUserRisk = async (req, res) => {
  const { userId } = req.params;
  const data = await fetchRiskByUser(userId);
  res.json(data);
};
