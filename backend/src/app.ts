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
import authRoutes from "./routers/auth";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000"), 
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "200"),
  message: process.env.RATE_LIMIT_MESSAGE || "Too many requests from this IP, please try again later",
});

app.use(limiter);

const userApiPath = process.env.USER_API || "/api/users";
const applicationApiPath = process.env.APPLICATION_API || "/api/applications";
const uploadFolderApiPath = process.env.S3RoutesAPI || "/api/s3";
const violationApiPath = process.env.VIOLATION_API || "/api/violations";
const casesApiPath = process.env.CASE_API || "/api/cases";
const docsApiPath = process.env.DOCS_API || "/api/docs";
const lawyerApiPath = "/api/lawyers";

app.use("/auth", authRoutes);
app.use(userApiPath, userRoutes);
app.use(applicationApiPath, application);
app.use(uploadFolderApiPath, uploadFolder);
app.use(violationApiPath, violationRoutes);
app.use(casesApiPath, caseRoutes);
app.use(docsApiPath, uploadDocsRouter);
app.use(lawyerApiPath, lawyerRoutes);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;