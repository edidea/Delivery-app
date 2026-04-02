import { getAllShops } from "../services/shopsService.js";

export const getShops = async (req, res) => {
  try {
    const shops = await getAllShops();

    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found" });
    }

    res.status(200).json(shops);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Server error" });
  }
};
