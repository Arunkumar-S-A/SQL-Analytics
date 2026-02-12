import axios from "axios";
const BASE = "http://localhost:5000/api/analytics";



export const getWeekly = () =>
  fetch(`${BASE}/weekly`).then(res => res.json());

export const getMonthly = () =>
  fetch(`${BASE}/monthly`).then(res => res.json());

export const getRankings = () =>
  fetch(`${BASE}/rankings`).then(res => res.json());

export const getCategorySpend = () =>
  fetch(`${BASE}/category-spend`).then(res => res.json());

<<<<<<< HEAD
export const getWeeklyTotal = () =>
  fetch(`${BASE}/weekly-total`).then(res => res.json());

export const getMonthlyTotal = () =>
  fetch(`${BASE}/monthly-total`).then(res => res.json());
=======
export const getSummary = async () => {
  const res = await axios.get("http://localhost:5000/api/analytics/summary");
  return res.data;
};
>>>>>>> 4cb5c5e (Dashboard UI changed-summary API added-padding-Navbar)
