export const getRiskData = () =>
  fetch("http://localhost:5000/api/risk").then(res => res.json());
