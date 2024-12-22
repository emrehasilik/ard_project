import express from "express";
import multer from "multer";
import {
  uploadToS3,
  getFileFromS3,
  deleteFileFromS3,
  listFilesInS3,
  updateFileInS3,
} from "../controllers/uploadFolder"; // İş mantığını içeren fonksiyonları içe aktar

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Dosya yükleme için multer yapılandırması

// **Dosya yükleme**
router.post("/upload", upload.single("file"), uploadToS3);

// **Tek bir dosyanın URL'sini alma**
router.get("/file/:key", getFileFromS3);

// **Dosya silme**
router.delete("/file/:key", deleteFileFromS3);

// **Klasördeki dosyaları listeleme**
router.get("/files", listFilesInS3); // Önemli: Burada /files endpoint'i doğru tanımlandı.

// **Dosya güncelleme**
router.put("/file", upload.single("file"), updateFileInS3);

export default router;
