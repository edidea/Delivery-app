import pool from "../db/pool.js";

export const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories ORDER BY id");
  return result.rows;
};
