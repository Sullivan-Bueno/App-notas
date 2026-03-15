import express from "express";
import { authUser, JWTVerify } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authUser);
router.get("/verify-token", JWTVerify);

export default router;
