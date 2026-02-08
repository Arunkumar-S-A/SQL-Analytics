const BASE = "http://localhost:5000/api/analytics";

export const getSummary = () =>
  fetch(`${BASE}/summary`).then(res => res.json());

export const getWeekly = () =>
  fetch(`${BASE}/weekly`).then(res => res.json());

export const getMonthly = () =>
  fetch(`${BASE}/monthly`).then(res => res.json());

export const getRankings = () =>
  fetch(`${BASE}/rankings`).then(res => res.json());

export const getCategorySpend = () =>
  fetch(`${BASE}/category-spend`).then(res => res.json());
