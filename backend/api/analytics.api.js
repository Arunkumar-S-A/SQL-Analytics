export const getWeeklySpending = async () => {
  const res = await fetch('http://localhost:3001/analytics/weekly');
  return res.json();
};
