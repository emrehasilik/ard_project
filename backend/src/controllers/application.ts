import { Request, Response } from "express";
import Application from "../models/application";
import Violation from "../models/violation";

// Yeni Başvuru ve Hak İhlali Ekle
export const createApplicationWithViolation = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Gelen istek:", req.body); // Gelen veriyi loglayın
    const { applicationData, violationData } = req.body;

    // Hak İhlali Verisi Kaydet
    let violationId = null;
    if (violationData) {
      const newViolation = new Violation(violationData);
      const savedViolation = await newViolation.save();
      violationId = savedViolation._id;
    }

    // Başvuru Verisi Kaydet
    const application = new Application({
      ...applicationData,
      violationId, // Hak ihlali referansı ekleniyor
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (err) {
    console.error("Hata oluştu:", err);
    res.status(400).json({
      error: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};


// Hak İhlalini Getirerek Başvuruyu Listele
export const getApplicationWithViolation = async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id).populate("violationId");
    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred.",
    });
  }
};
