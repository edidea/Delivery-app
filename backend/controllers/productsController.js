import { getProducts, getProductsByIds } from "../services/productsService.js";

export const getAllProducts = async (req, res) => {
  try {
    const { shopId, page = 1 } = req.query;

    const data = await getProducts(
      shopId ? Number(shopId) : null,
      Number(page),
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
};
export const getProductsByIdsController = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ error: "No ids provided" });
    }

    const idsArray = ids.split(",").map(Number);

    const products = await getProductsByIds(idsArray);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
