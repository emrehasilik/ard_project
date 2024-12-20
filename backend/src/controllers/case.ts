import { Request, Response } from "express";
import Case from "../models/case";

// Yeni Dava Oluştur
export const createCase = async (req: Request, res: Response): Promise<void> => {
  try {
    const caseData = req.body;
    const newCase = new Case(caseData);
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

// Avukata atanan davaları listele
export const getAssignedCases = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const lawyerId = req.user.id;
    const assignedCases = await Case.find({ "parties.lawyer": lawyerId }).populate("parties.lawyer");
    res.status(200).json(assignedCases);
  } catch (err) {
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
