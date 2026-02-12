import express from "express";
import {
  getWeeklySpend,
  getMonthlySpend,
  getUserRankings,
<<<<<<< HEAD
  fetchMonthlyTotalSpend,
  fetchWeeklyTotalSpend,
  fetchCategorySpendingRank
=======
  getSummary 
>>>>>>> 4cb5c5e (Dashboard UI changed-summary API added-padding-Navbar)
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/weekly", getWeeklySpend);
router.get("/monthly", getMonthlySpend);
router.get("/rankings", getUserRankings);
<<<<<<< HEAD
router.get("/monthly-total", fetchMonthlyTotalSpend);
router.get("/weekly-total", fetchWeeklyTotalSpend);
=======
router.get("/summary", getSummary);
>>>>>>> 4cb5c5e (Dashboard UI changed-summary API added-padding-Navbar)

export default router;

