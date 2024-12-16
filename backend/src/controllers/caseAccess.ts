import { Request, Response } from "express";
import Case from "../models/case";
import logger from "../utils/logger";

export const getCaseById = async (req: Request, res: Response): Promise<void> => {
    const startTime = Date.now(); // İşlem süresi ölçümü
    try {
      const caseId = req.params.id;
      const userId = req.user.id;
      const userRoles = req.user.role || [];
  
      logger.info(`Request received to get case by ID: ${caseId}. User ID: ${userId}`);
  
      // Baro ise tüm davalara erişebilir
      if (userRoles.includes("bar")) {
        const caseData = await Case.findById(caseId);
        if (!caseData) {
          logger.warn(`Case not found for ID: ${caseId}`);
          res.status(404).json({ error: "Case not found" });
          return;
        }
        const duration = Date.now() - startTime;
        logger.info(`Case retrieved successfully. Response in ${duration} ms.`);
        res.status(200).json(caseData);
        return;
      }
  
      // Avukat ise sadece kendisine atanmış davalara erişebilir
      const caseData = await Case.findOne({ _id: caseId, "parties.lawyer": userId });
      if (!caseData) {
        logger.warn(`Access denied or case not found for User ID: ${userId}, Case ID: ${caseId}`);
        res.status(403).json({ error: "Access denied or case not found" });
        return;
      }
  
      const duration = Date.now() - startTime;
      logger.info(`Case retrieved successfully for lawyer. Response in ${duration} ms.`);
      res.status(200).json(caseData);
    } catch (err) {
      const duration = Date.now() - startTime;
      logger.error(`Error occurred while retrieving case. Response in ${duration} ms. Error: ${err}`);
      res.status(500).json({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      });
    }
  };

export const updateCase = async (req: Request, res: Response): Promise<void> => {
    try {
      const caseId = req.params.id;
      const userId = req.user.id;
      const userRoles = req.user.role || [];
  
      // Baro her davayı güncelleyebilir
      if (userRoles.includes("bar")) {
        const updatedCase = await Case.findByIdAndUpdate(caseId, req.body, { new: true });
        if (!updatedCase) {
          res.status(404).json({ error: "Case not found" });
          return;
        }
        res.status(200).json(updatedCase);
        return;
      }
  
      // Avukat ise sadece kendisine atanmış davaları güncelleyebilir
      const updatedCase = await Case.findOneAndUpdate(
        { _id: caseId, "parties.lawyer": userId },
        req.body,
        { new: true }
      );
  
      if (!updatedCase) {
        res.status(403).json({ error: "Access denied or case not found" });
        return;
      }
  
      res.status(200).json(updatedCase);
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      });
    }
  };