import { Request, Response } from "express";
import User from "../models/user";

// Tüm avukatları getir
export const getLawyers = async (req: Request, res: Response): Promise<void> => {
  try {
    const lawyers = await User.find({ role: "lawyer" });
    res.status(200).json(lawyers);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching lawyers:", errMessage);
    res.status(500).json({ message: "Failed to fetch lawyers", error: errMessage });
  }
};

// Yeni avukat ekle
interface AddLawyerBody {
  firstName: string;
  lastName: string;
  nationalId: string;
  username: string;
  password: string;
  mail: string;
}

export const addLawyer = async (
  req: Request<{}, {}, AddLawyerBody>,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, nationalId, username, password, mail } = req.body;

    // Giriş verilerini kontrol et
    console.log("Gelen veriler:", req.body);

    const newLawyer = new User({
      firstName,
      lastName,
      nationalId,
      username,
      password,
      mail,
      role: ["lawyer"], // Rolü 'lawyer' olarak belirle
    });

    await newLawyer.save();
    res.status(201).json(newLawyer);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Avukat ekleme hatası:", errMessage);
    res.status(500).json({ message: "Failed to add lawyer", error: errMessage });
  }
};

// Avukat bilgilerini güncelle
interface UpdateLawyerParams {
  nationalId: string;
}

export const updateLawyer = async (
  req: Request<UpdateLawyerParams>,
  res: Response
): Promise<void> => {
  const { nationalId } = req.params;
  const updatedData = req.body;

  try {
    const updatedLawyer = await User.findOneAndUpdate(
      { nationalId, role: "lawyer" },
      updatedData,
      { new: true }
    );

    if (!updatedLawyer) {
      res.status(404).json({ message: "Lawyer not found" });
      return;
    }

    res.status(200).json(updatedLawyer);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating lawyer:", errMessage);
    res.status(500).json({ message: "Failed to update lawyer", error: errMessage });
  }
};

// Avukatı sil
export const deleteLawyer = async (
  req: Request<UpdateLawyerParams>,
  res: Response
): Promise<void> => {
  const { nationalId } = req.params;

  try {
    const deletedLawyer = await User.findOneAndDelete({
      nationalId,
      role: "lawyer",
    });

    if (!deletedLawyer) {
      res.status(404).json({ message: "Lawyer not found" });
      return;
    }

    res.status(200).json({ message: "Lawyer deleted successfully" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting lawyer:", errMessage);
    res.status(500).json({ message: "Failed to delete lawyer", error: errMessage });
  }
};
