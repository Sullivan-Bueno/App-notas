import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./routes/NoteRoute.js";

// API config
dotenv.config({ quiet: true, path: "./.env" });
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/note", noteRoutes);

//Connect DB then start API service
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("API service is running!");
  });
});
