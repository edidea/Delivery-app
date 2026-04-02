import express from "express";
import { getShops } from "../controllers/shopsController.js";

const router = express.Router();

router.get("/", getShops);

export default router;
