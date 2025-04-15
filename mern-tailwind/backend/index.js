import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
