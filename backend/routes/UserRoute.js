import express from "express"
import { createUser,getUser } from "../controllers/userController.js"

const router = express.Router()

router.get("/:id", getUser)
router.post("/", createUser)

export default router;