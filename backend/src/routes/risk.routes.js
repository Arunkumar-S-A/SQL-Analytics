import express from "express";
import {
  getRiskIndicators,
  getUserRisk
} from "../controllers/risk.controller.js";

const router = express.Router();

router.get("/", getRiskIndicators);
router.get("/:userId", getUserRisk);

export default router;
