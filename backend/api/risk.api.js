export const getRiskIndicators = async () => {
  const res = await fetch('http://localhost:3001/risk/indicators');
  return res.json();
};
