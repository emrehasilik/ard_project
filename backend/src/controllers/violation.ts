import { Request, Response } from "express";
import Violation from "../models/violation";

// Yeni Hak İhlali Kaydet
export const createViolation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { scanningPeriod, eventCategory, eventSummary, dataCategory, ...otherFields } = req.body;

    if (!scanningPeriod || !eventCategory || !eventSummary || !dataCategory) {
      res.status(400).json({ error: "Required fields are missing" });
      return;
    }

    const violation = new Violation({
      scanningPeriod,
      eventCategory,
      eventSummary,
      dataCategory,
      ...otherFields,
    });

    const savedViolation = await violation.save();
    res.status(201).json({ message: "Violation created successfully", violation: savedViolation });
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// Tüm Hak İhlallerini Getir
export const getAllViolations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const violations = await Violation.find();
    res.status(200).json(violations);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// Belirli Bir Hak İhlalini Getir
export const getViolationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const violation = await Violation.findById(req.params.id);
    if (!violation) {
      res.status(404).json({ error: "Violation not found" });
      return;
    }
    res.status(200).json(violation);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// Hak İhlalini Güncelle
export const updateViolation = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedViolation = await Violation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedViolation) {
      res.status(404).json({ error: "Violation not found" });
      return;
    }
    res.status(200).json(updatedViolation);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};

// Hak İhlalini Sil
export const deleteViolation = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedViolation = await Violation.findByIdAndDelete(req.params.id);
    if (!deletedViolation) {
      res.status(404).json({ error: "Violation not found" });
      return;
    }
    res.status(200).json({ message: "Violation deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};
