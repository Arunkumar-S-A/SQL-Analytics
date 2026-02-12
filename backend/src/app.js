import express from "express";
import cors from "cors";

import usersRoutes from "./routes/users.routes.js";
import transactionsRoutes from "./routes/transactions.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import riskRoutes from "./routes/risk.routes.js";
import userAnalyticsRoutes from "./routes/userAnalytics.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/risk", riskRoutes);
app.use("/api/user-analytics", userAnalyticsRoutes);


export default app;
