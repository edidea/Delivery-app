import express from "express";
import {
  getAllProducts,
  getProductsByIdsController,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/products-by-ids", getProductsByIdsController);

export default router;
