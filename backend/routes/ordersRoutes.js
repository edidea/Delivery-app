import express from "express";
import { createOrderController } from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", createOrderController);

export default router;
