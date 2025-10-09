import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ quiet: true, path: "./.env" });

app.get("/", (req, res) => {
  try {
    res.status(201).json("Hello World");
  } catch (err) {
    res.status(500).send(err);
  }
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Api rodando!");
  });
});