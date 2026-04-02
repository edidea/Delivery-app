import { getAllCategories } from "../services/categoriesService.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Server error" });
  }
};
