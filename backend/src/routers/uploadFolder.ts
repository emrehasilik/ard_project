import { Router } from "express";
import { uploadToS3 } from "../controllers/uploadFolder";
import upload from "../middlewares/uploadFolder";

const router = Router();

// POST: S3'e dosya yükleme
router.post("/upload", upload.single("file"), uploadToS3);

export default router;
