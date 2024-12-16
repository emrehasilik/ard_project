import { Router } from "express";
import {
  createViolation,
  getAllViolations,
  getViolationById,
  updateViolation,
  deleteViolation,
} from "../controllers/violation";

const router = Router();

// POST: Yeni Hak İhlali Oluştur
router.post("/", createViolation);

// GET: Tüm Hak İhlallerini Listele
router.get("/", getAllViolations);

// GET: Belirli Bir Hak İhlalini Getir
router.get("/:id", getViolationById);

// PUT: Hak İhlalini Güncelle
router.put("/:id", updateViolation);

// DELETE: Hak İhlalini Sil
router.delete("/:id", deleteViolation);

export default router;
