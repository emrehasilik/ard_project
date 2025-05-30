import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/user";

const router = Router();


router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

export default router;
