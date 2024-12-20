import { Request, Response } from "express";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

// AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// **1. Dosya Yükleme**
export const uploadToS3 = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!process.env.AWS_BUCKET) {
      throw new Error("AWS_BUCKET is not defined in environment variables");
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    res.status(200).json({
      message: "File successfully uploaded to S3",
      url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// **2. Tek Dosya URL'sini Alma**
export const getFileFromS3 = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;
    if (!key) {
      res.status(400).json({ error: "File key is required" });
      return;
    }

    const fileUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    res.status(200).json({ url: fileUrl });
  } catch (err) {
    console.error("Get file error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// **3. Dosya Silme**
export const deleteFileFromS3 = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;
    if (!key) {
      res.status(400).json({ error: "File key is required" });
      return;
    }

    const params = {
      Bucket: process.env.AWS_BUCKET || "",
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    res.status(200).json({ message: "File successfully deleted from S3" });
  } catch (err) {
    console.error("Delete file error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// **4. Klasördeki Dosyaları Listeleme**
export const listFilesInS3 = async (req: Request, res: Response): Promise<void> => {
  try {
    const folder = req.query.folder;
    const prefix = typeof folder === "string" ? folder : "";

    const params = {
      Bucket: process.env.AWS_BUCKET || "",
      Prefix: prefix,
    };

    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    // Eğer S3'te dosya yoksa, boş bir liste döndür
    if (!data.Contents || data.Contents.length === 0) {
      res.status(200).json({ files: [] });
      return;
    }

    const files = data.Contents.map((file) => ({
      key: file.Key,
      url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
    }));

    res.status(200).json({ files });
  } catch (err) {
    console.error("List files error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};




// **5. Dosya Güncelleme**
export const updateFileInS3 = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const { key } = req.body;

    if (!file || !key) {
      res.status(400).json({ error: "File and key are required" });
      return;
    }

    const params = {
      Bucket: process.env.AWS_BUCKET || "",
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    res.status(200).json({
      message: "File successfully updated in S3",
      url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    });
  } catch (err) {
    console.error("Update file error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};
