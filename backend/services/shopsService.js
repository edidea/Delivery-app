import pool from "../db/pool.js";

export const getAllShops = async () => {
  const result = await pool.query("SELECT * FROM shops ORDER BY id");
  return result.rows;
};
