import { Request, Response } from "express";
import Case from "../models/case";

// Yeni Dava Oluştur
export const createCase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { applicationId, parties, caseNumber, subject, court, indictment, files } = req.body;

    console.log("parties:", parties);

    const newCase = new Case({
      applicationId,
      parties: {
        name: parties.name,
        lawyer: parties.lawyer, // Avukatın ObjectId'si
      },
      caseNumber,
      subject,
      court,
      indictment,
      files,
      status: "ongoing",
    });

    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (err) {
    res.status(400).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};


// Tüm Davaları Listele (Baro için)
export const getAllCases = async (req: Request, res: Response): Promise<void> => {
  try {
    const cases = await Case.find().populate("parties.lawyer");
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

export const getAssignedCases = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const lawyerId = req.user.id; // JWT'den gelen avukat ID'si
    console.log("Avukat ID:", lawyerId);
    // Avukata atanan davaları sorgula
    const assignedCases = await Case.find({
      "parties.lawyer": lawyerId, // Avukatın ID'sine göre sorgula
      
    }).populate("parties.lawyer", "firstName lastName email"); // Avukat bilgilerini ilişkilendir

    console.log("Atanan dava sayısı:", assignedCases);

    if (assignedCases.length === 0) {
      res.status(404).json({ message: "Henüz size atanan bir dava bulunmamaktadır." });
      return;
    }

    res.status(200).json(assignedCases);
  } catch (err) {
    console.error("Hata:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};



// Belirli Bir Davayı ID'ye Göre Getir
export const getCaseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const caseItem = await Case.findById(req.params.id).populate("parties.lawyer");
    if (!caseItem) {
      res.status(404).json({ error: "Case not found" });
      return;
    }
    res.status(200).json(caseItem);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// Davayı Güncelle
export const updateCase = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCase) {
      res.status(404).json({ error: "Case not found" });
      return;
    }
    res.status(200).json(updatedCase);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// Davayı Kapat (Durumu "closed" Olarak Güncelle)
export const closeCase = async (req: Request, res: Response): Promise<void> => {
  try {
    const closedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { status: "closed" },
      { new: true }
    );
    if (!closedCase) {
      res.status(404).json({ error: "Case not found" });
      return;
    }
    res.status(200).json({ message: "Case successfully closed.", closedCase });
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};
