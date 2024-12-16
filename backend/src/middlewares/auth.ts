import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

// JwtPayload arayüzüne id ekliyoruz
interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as CustomJwtPayload; // jwt key tanımladım env de
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
