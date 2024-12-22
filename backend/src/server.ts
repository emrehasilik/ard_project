import express from "express";
import cors from "cors";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
