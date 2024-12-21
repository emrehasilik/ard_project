import { Router } from "express";
import { login } from "../controllers/auth";

const router = Router();

// Login (Genel)
router.post("/login", login);

export default router;
