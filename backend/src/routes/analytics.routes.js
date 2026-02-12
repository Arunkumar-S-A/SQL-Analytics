import express from "express";
import {
  getWeeklySpend,
  getMonthlySpend,
  getUserRankings,
  fetchMonthlyTotalSpend,
  fetchWeeklyTotalSpend
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/weekly", getWeeklySpend);
router.get("/monthly", getMonthlySpend);
router.get("/rankings", getUserRankings);
router.get("/monthly-total", fetchMonthlyTotalSpend);
router.get("/weekly-total", fetchWeeklyTotalSpend);

export default router;

