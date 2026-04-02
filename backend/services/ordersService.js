import pool from "../db/pool.js";

export const createOrder = async ({ user, items, coupon }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 🔹 отримати продукти
    const ids = items.map((i) => i.productId);

    const productsRes = await client.query(
      `SELECT * FROM products WHERE id = ANY($1::int[])`,
      [ids],
    );

    const products = productsRes.rows;

    // 🔹 рахуємо total
    let total = 0;

    const orderItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return {
        product_id: product.id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    // 🔹 купон
    let discount = 0;

    if (coupon) {
      const couponRes = await client.query(
        `SELECT * FROM coupons WHERE code = $1 AND is_active = true`,
        [coupon],
      );

      if (couponRes.rows.length > 0) {
        const c = couponRes.rows[0];
        discount = (total * c.discount_value) / 100;
      }
    }

    const finalTotal = total - discount;

    // 🔹 створюємо order
    const orderRes = await client.query(
      `INSERT INTO orders 
      (user_name, user_email, user_phone, user_address, discount_value, total_price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`,
      [user.name, user.email, user.phone, user.address, discount, finalTotal],
    );

    const orderId = orderRes.rows[0].id;

    // 🔹 order_items
    for (const item of orderItemsData) {
      await client.query(
        `INSERT INTO order_items 
        (order_id, product_id, quantity, price_at_purchase)
        VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price],
      );
    }

    await client.query("COMMIT");

    return { orderId };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
