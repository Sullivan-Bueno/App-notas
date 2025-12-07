import express from "express";
import {
  getNotes,
  deleteNotes,
  addNotes,
  updateNotes,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNotes);
router.post("/", addNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
