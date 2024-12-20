import { Request, Response } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import Doc from "../models/docs";
import Case from "../models/case";

dotenv.config();

// AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

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

    const uploadedFiles: Record<string, string[]> = {};

    for (const fieldName in files) {
      const fileArray = files[fieldName];
      const urls = await Promise.all(
        fileArray.map(async (file) => {
          const uniqueFileName = `${Date.now()}-${file.originalname}`;
          const params = {
            Bucket: process.env.AWS_BUCKET || "", // S3 bucket adı
            Key: uniqueFileName, // Benzersiz dosya adı
            Body: file.buffer, // Dosya içeriği
            ContentType: file.mimetype, // Dosya türü
          };

          const command = new PutObjectCommand(params);
          await s3.send(command);

          // Yüklenen dosyanın URL'sini oluştur
          return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
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
    console.error("Upload error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};
