import express from "express";
import {
  getWeeklySpend,
  getMonthlySpend,
  getUserRankings
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/weekly", getWeeklySpend);
router.get("/monthly", getMonthlySpend);
router.get("/rankings", getUserRankings);

export default router;
