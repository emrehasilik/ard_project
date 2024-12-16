import { Router } from "express";
import {
  createCase,
  getAllCases,
  getCaseById,
  updateCase,
  closeCase,
} from "../controllers/case";

const router = Router();

// POST: Yeni Dava Oluştur
router.post("/", createCase);

// GET: Tüm Davaları Listele
router.get("/", getAllCases);

// GET: Belirli Bir Davayı ID'ye Göre Getir
router.get("/:id", getCaseById);

// PUT: Davayı Güncelle
router.put("/:id", updateCase);

// DELETE: Davayı Kapat
router.delete("/:id", closeCase);

export default router;
