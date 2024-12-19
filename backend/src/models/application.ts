import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  firstName: string;
  lastName: string;
  nationalId: string; // T.C. Kimlik No
  applicationType: string;
  applicationDate: Date;
  lawyer: string;
  violationReason: string;
  submissionType: string;
  handler: string;
  description?: string;
  courtInfo?: {
    caseNumber: string;
    courtName: string;
    courtFileNumber: string;
    resultDescription: string;
    resultStatus: string;
  };
  fileLinks: string[]; // Dosya linkleri için S3 URL'leri
  status: "approved" | "rejected" | "pending"; // Başvuru durumu
  violationId?: string; // Hak ihlali ile ilişki
}

const ApplicationSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nationalId: { type: String, required: true }, // T.C. Kimlik No
  applicationType: { type: String, required: true },
  applicationDate: { type: Date, required: true },
  lawyer: { type: String, required: true },
  violationReason: { type: String, required: true },
  submissionType: { type: String, required: true },
  handler: { type: String, required: false },
  description: { type: String },
  courtInfo: {
    caseNumber: { type: String },
    courtName: { type: String },
    courtFileNumber: { type: String },
    resultDescription: { type: String },
    resultStatus: { type: String },
  },
  fileLinks: { type: [String] },
  status: { type: String, enum: ["approved", "rejected", "pending"], default: "pending" },
  violationId: { type: Schema.Types.ObjectId, ref: "Violation" }, // Hak ihlali referansı
});

export default mongoose.model<IApplication>("Application", ApplicationSchema);
