import pool from "../db/pool.js";

export const getProducts = async (shopId, page = 1) => {
  const limit = 6;
  const offset = (page - 1) * limit;

  let query = `SELECT * FROM products`;
  let values = [];

  if (shopId) {
    query += ` WHERE shop_id = $1`;
    values.push(shopId);
  }

  query += ` ORDER BY id LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  // 🔹 основні продукти
  const result = await pool.query(query, values);

  // 🔥 ОЦЕ ТИ СЮДИ ДОДАЄШ
  const countQuery = shopId
    ? "SELECT COUNT(*) FROM products WHERE shop_id = $1"
    : "SELECT COUNT(*) FROM products";

  const countResult = await pool.query(countQuery, shopId ? [shopId] : []);

  const total = Number(countResult.rows[0].count);

  // 🔹 повертаємо не просто масив, а обʼєкт
  return {
    products: result.rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
export const getProductsByIds = async (ids) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE id = ANY($1::int[])`,
    [ids],
  );

  return result.rows;
};
