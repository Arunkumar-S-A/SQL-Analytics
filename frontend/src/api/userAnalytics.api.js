import axios from "axios";

const BASE = "http://localhost:5000/api/user-analytics";

export const getUsers = () => axios.get(BASE).then(res => res.data);
export const getUserTransactions = (id) =>
  axios.get(`${BASE}/${id}/transactions`).then(res => res.data);
export const getUserAnomalies = (id) =>
  axios.get(`${BASE}/${id}/anomalies`).then(res => res.data);
export const getUserPattern = (id) =>
  axios.get(`${BASE}/${id}/pattern`).then(res => res.data);
