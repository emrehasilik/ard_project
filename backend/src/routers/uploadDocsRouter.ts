import { Router } from "express";
import upload from "../middlewares/uploadFolder"; // multer middleware
import { uploadDocsToS3 } from "../controllers/uploadDocsController";

const router = Router();

router.post(
  "/upload",
  upload.fields([
    { name: "monitoringReports", maxCount: 5 },
    { name: "petitions", maxCount: 5 },
    { name: "transcripts", maxCount: 5 },
  ]),
  uploadDocsToS3
);

export default router;
