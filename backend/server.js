import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getNotes, deleteNotes } from "./controllers/noteController.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ quiet: true, path: "./.env" });

app.get("/", getNotes);

app.get("/:id", getNotes);

app.delete("/deletenotes/:id", deleteNotes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("API service is running!");
  });
});
