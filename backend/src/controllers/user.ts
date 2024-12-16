import { Request, Response } from "express";
import User from "../models/user";

// Yeni kullanıcı oluştur
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res
      .status(400)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
};

// Tüm kullanıcıları listele
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
};

// Belirli bir kullanıcıyı getir
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
  };