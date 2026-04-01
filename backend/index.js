import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
