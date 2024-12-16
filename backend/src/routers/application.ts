import { Router } from "express";
import { createApplicationWithViolation, getApplicationWithViolation } from "../controllers/application";

const router = Router();

// POST: Başvuru ve Hak İhlali Ekle
router.post("/", createApplicationWithViolation);

// GET: Başvuru ve Hak İhlalini Listele
router.get("/:id", getApplicationWithViolation);

export default router;
