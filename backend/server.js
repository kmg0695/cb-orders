import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

connectDB();
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/clients", clientRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
