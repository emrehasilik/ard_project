import { Request, Response } from "express";
import User from "../models/user";

// Yeni kullanıcı oluştur
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = new User(req.body);
    console.log("Yeni kullanıcı ekleniyor:", newUser); // Loglama
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Kullanıcı oluşturulurken hata:", error); // Loglama
    res.status(500).json({ message: "An error occurred", error });
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