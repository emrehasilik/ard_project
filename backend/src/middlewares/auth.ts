import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Case from "../models/case"; // Case modelini import ediyoruz

// req.user tipini genişletiyoruz
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string[] };
    }
  }
}

// JWT doğrulama middleware'i
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  console.log("Auth header:", authHeader);

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token format is invalid" });
    return;
  }

  console.log("Token:", token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as {
      id: string;
      role: string[];
    };
    console.log("Token çözümlendi:", decoded);
    req.user = decoded;
    console.log("req.user:", req.user);
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};


export const isBar = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || !req.user.role.includes("Baro")) {
    res.status(403).json({ message: "Access denied" });
    return;
  }
  next();
};

export const isLawyer = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || !req.user.role.includes("lawyer")) {
    res.status(403).json({ message: "Access denied" });
    return;
  }
  next();
};

// Avukatın sadece kendi davalarını görmesini sağlayan middleware
export const isLawyerAndOwnsCase = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || !req.user.role.includes("lawyer")) {
    res.status(403).json({ message: "Access denied" });
    return;
  }

  const lawyerId = req.user.id;
  const caseId = req.params.id;

  // Case modelini kullanarak avukatın davayı kontrol edin
  Case.findOne({ _id: caseId, "parties.lawyer": lawyerId }, (err: any, caseItem: any) => {
    if (err || !caseItem) {
      res.status(403).json({ message: "Access denied or case not found" });
      return;
    }
    next();
  });
};
