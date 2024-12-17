import { Router } from "express";
import {
  createApplicationWithViolation,
  getApplicationWithViolation,
} from "../controllers/application";
import Application from "../models/application";

const router = Router();

// POST: Başvuru ve Hak İhlali Ekle
router.post("/", createApplicationWithViolation);

// GET: Tüm Başvuruları Listele
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    // Hatanın türünü Error olarak dönüştürme
    const errorMessage = err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.";
    res.status(500).json({ error: errorMessage });
  }
});

// GET: Belirli Başvuruyu ID ile Getir
router.get("/:id", getApplicationWithViolation);

export default router;
