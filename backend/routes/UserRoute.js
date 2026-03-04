import express from "express";
import {
  authUser,
  createUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/auth", authUser);

export default router;
