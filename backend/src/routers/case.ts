import { Router } from "express";
import {
  createCase,
  getAllCases,
  getCaseById,
  updateCase,
  closeCase,
  getAssignedCases,
} from "../controllers/case";
import { requireAuth, isBar, isLawyer } from "../middlewares/auth";

const router = Router();

// Baro: Tüm davalara erişim
router.get("/", requireAuth, isBar, getAllCases);

// Avukat: Sadece kendine atanmış davaları listele
router.get("/assigned", requireAuth, isLawyer, getAssignedCases);

// Herhangi bir authenticated kullanıcı dava oluşturabilsin derseniz (genelde baro yapar)
router.post("/", requireAuth, isBar, createCase);

// Dava detayları (Baro görebilir. Avukat da sadece kendine atanmış bir dava ise görebilsin? 
// Bunun için ekstra kontrol gerekecek. Şimdilik sadece Baro'ya açık:
router.get("/:id", requireAuth, isBar, getCaseById);

// Davayı güncelle (Baro)
router.put("/:id", requireAuth, isBar, updateCase);

// Davayı kapat (Baro)
router.delete("/:id", requireAuth, isBar, closeCase);

export default router;
