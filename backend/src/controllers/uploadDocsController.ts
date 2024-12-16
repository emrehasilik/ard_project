import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data";
import Doc from "../models/docs";
import Case from "../models/case";

dotenv.config();

export const uploadDocsToS3 = async (req: Request, res: Response): Promise<void> => {
  try {
    const { caseId } = req.body;

    if (!caseId) {
      res.status(400).json({ error: "Case ID is required" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files || Object.keys(files).length === 0) {
      res.status(400).json({ error: "No files provided" });
      return;
    }

    // Çevre değişkenlerinin doğruluğunu kontrol et
    const s3Project = process.env.S3_PROJECT;
    const s3Bucket = process.env.S3_BUCKET;
    const s3AccessKey = process.env.S3_ACCESS_KEY;
    const s3UploadUrl = process.env.S3_UPLOAD_URL;

    if (!s3Project || !s3Bucket || !s3AccessKey || !s3UploadUrl) {
      res.status(500).json({
        error: "S3 environment variables are not properly configured.",
      });
      return;
    }

    const uploadedFiles: Record<string, string[]> = {};

    for (const fieldName in files) {
      const fileArray = files[fieldName];
      const urls = await Promise.all(
        fileArray.map(async (file) => {
          const formData = new FormData();
          const uniqueFileName = `${Date.now()}-${file.originalname}`;
          
          // FormData'ya güvenli bir şekilde verileri ekle
          formData.append("project", s3Project);
          formData.append("bucket", s3Bucket);
          formData.append("accessKey", s3AccessKey);
          formData.append("file", file.buffer, uniqueFileName);

          const response = await axios.post(s3UploadUrl, formData, {
            headers: { ...formData.getHeaders() },
          });

          if (response.status === 200) {
            const data = response.data as { files: { url: string }[] };
            return data.files[0].url; // S3'ten dönen dosya linki
          } else {
            throw new Error("Failed to upload file to S3");
          }
        })
      );

      uploadedFiles[fieldName] = urls;
    }

    // Docs modeline kaydet
    const doc = new Doc({
      monitoringReports: uploadedFiles["monitoringReports"],
      petitions: uploadedFiles["petitions"],
      transcripts: uploadedFiles["transcripts"],
    });

    const savedDoc = await doc.save();

    // Case modelindeki files alanını güncelle
    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      {
        $push: {
          files: [
            ...(uploadedFiles["monitoringReports"] || []),
            ...(uploadedFiles["petitions"] || []),
            ...(uploadedFiles["transcripts"] || []),
          ],
        },
      },
      { new: true }
    );

    if (!updatedCase) {
      res.status(404).json({ error: "Case not found" });
      return;
    }

    res.status(200).json({
      message: "Files successfully uploaded to S3 and linked to case",
      updatedCase,
    });
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};
