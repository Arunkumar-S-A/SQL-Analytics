import pool from "../config/db.js";

export const getAllUsers = async (req, res) => {
  const [users] = await pool.query("SELECT * FROM users");
  res.json(users);
};
