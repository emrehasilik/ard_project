import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routers/user";
import application from "./routers/application";
import uploadFolder from "./routers/uploadFolder";
import rateLimit from "express-rate-limit";
import caseRoutes from "./routers/case";
import violationRoutes from "./routers/violation";
import uploadDocsRouter from "./routers/uploadDocsRouter";
import lawyerRoutes from "./routers/lawyer";

dotenv.config();

const app = express();

// **CORS'u aktif et**
const allowedOrigins = ["http://localhost:5173"]; // Gerekirse üretim ortamı adresinizi ekleyin
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// **JSON Parsingi**
app.use(express.json());

// **Rate Limiting**
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000"), // 1 dakika
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUEST || "200"), // Maksimum istek
  message:
    process.env.RATE_LIMIT_MESSAGE ||
    "Too many requests from this IP, please try again later",
});
app.use(limiter);

// **API Yolları**
const userApiPath = process.env.USER_API || "/api/users";
const applicationApiPath = process.env.APPLICATION_API || "/api/applications";
const uploadFolderApiPath = process.env.S3_ROUTES_API || "/api/s3"; // Doğru bağlandı
const violationApiPath = process.env.VIOLATION_API || "/api/violations";
const casesApiPath = process.env.CASE_API || "/api/cases";
const docsApiPath = process.env.DOCS_API || "/api/docs";
const lawyerApiPath = "/api/lawyers";

// **Router'ları Bağla**
app.use(userApiPath, userRoutes);
app.use(applicationApiPath, application);
app.use(uploadFolderApiPath, uploadDocsRouter); // Doğru router bağlandı
app.use(violationApiPath, violationRoutes);
app.use(casesApiPath, caseRoutes);
app.use(docsApiPath, uploadFolder);
app.use(lawyerApiPath, lawyerRoutes);

// **MongoDB Bağlantısı**
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// **Hata Yönetim Middleware'i**
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

export default app;
