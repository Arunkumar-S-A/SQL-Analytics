export const analyticsModules = [
  {
    id: "spike",
    title: "Spike Detection",
    description: "Detects abnormal transaction spikes",
    riskType: "SPIKE",
  },
  {
    id: "frequency",
    title: "High Frequency Transactions",
    description: "Detects excessive hourly activity",
    riskType: "HIGH_FREQUENCY",
  },
  {
    id: "oddhour",
    title: "Odd Hour Activity",
    description: "Transactions between 12AM–5AM",
    riskType: "ODD_HOUR",
  },
  {
    id: "dormancy",
    title: "Dormant Reactivation",
    description: "User active after long inactivity",
    riskType: "DORMANT_REACTIVATION",
  },
  {
    id: "retry",
    title: "Retry Success Pattern",
    description: "Failed → Success behavior",
    riskType: "RETRY_SUCCESS",
  },
];
