import { Router } from "express";
import {
  getLawyers,
  addLawyer,
  updateLawyer,
  deleteLawyer,
} from "../controllers/lawyer";

const router = Router();

router.get("/", getLawyers);
router.post("/", addLawyer);
router.put("/:nationalId", updateLawyer);
router.delete("/:nationalId", deleteLawyer);

export default router;
