import { createOrder } from "../services/ordersService.js";

export const createOrderController = async (req, res) => {
  try {
    const { user, items, coupon } = req.body;

    if (!user || !items || items.length === 0) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const result = await createOrder({ user, items, coupon });

    res.status(201).json(result);
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: error.message });
  }
};
