import { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";

// Amazon S3'e dosya yükleme
export const uploadToS3 = async (req: Request, res: Response): Promise<void> => {
  try {
    // Gelen dosyayı kontrol et
    const file = req.file; // Middleware (multer) kullanılarak dosya alınmalı
    if (!file) {
      res.status(400).json({ error: "No file provided" });
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

    // S3'e gönderilecek form-data hazırla
    const formData = new FormData();
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    formData.append("project", s3Project);
    formData.append("bucket", s3Bucket);
    formData.append("accessKey", s3AccessKey);
    formData.append("file", file.buffer, uniqueFileName);

    // S3'e POST isteği gönder
    const response = await axios.post(s3UploadUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Yanıt türünü güvenli bir şekilde kontrol et ve işle
    if (response.status === 200) {
      const data = response.data as { files: { filePath: string; fileId: string; url: string }[] };
      if (data.files && data.files.length > 0) {
        const { filePath, fileId, url } = data.files[0];
        res.status(200).json({
          message: "File successfully uploaded to S3",
          filePath,
          fileId,
          url,
        });
      } else {
        throw new Error("Invalid response format from S3");
      }
    } else {
      res.status(response.status).json({
        message: "Failed to upload file to S3",
        error: response.data,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};
