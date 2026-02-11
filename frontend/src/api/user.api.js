import axios from "axios";

const API = "http://localhost:5000/api";

export const getUsers = () => axios.get(`${API}/users`).then(res => res.data);
export const getUserTransactions = (id) =>
  axios.get(`${API}/transactions/${id}`).then(res => res.data);
export const getUserAnomalies = (id) =>
  axios.get(`${API}/anomalies/${id}`).then(res => res.data);
export const getUserPatterns = (id) =>
  axios.get(`${API}/patterns/${id}`).then(res => res.data);
