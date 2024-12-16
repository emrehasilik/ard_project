import mongoose, { Schema, Document } from "mongoose";

export interface ICase extends Document {
  applicationId: string; // Başvurunun ID'si
  parties: {
    name: string; // Taraf Adı Soyadı
    lawyer: mongoose.Types.ObjectId; // Avukat (users şemasına referans)
  };
  caseNumber: string; // Dava No
  subject: string; // Dava Konusu
  court: {
    name: string; // Mahkeme
    courtFileNumber: string; // Dosya No
  };
  indictment?: string; // İddianame
  files: string[];
  status: "ongoing" | "closed"; // Davanın durumu
}

const CaseSchema: Schema = new Schema({
  applicationId: { type: String, required: true, ref: "Application" },
  parties: {
    name: { type: String, required: true },
    lawyer: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Avukat referansı
  },
  caseNumber: { type: String, required: true },
  subject: { type: String, required: true },
  court: {
    name: { type: String, required: true },
    courtFileNumber: { type: String, required: true },
  },
  indictment: { type: String },
  files: { type: [String] },
  status: { type: String, enum: ["ongoing", "closed"], default: "ongoing" },
});

export default mongoose.model<ICase>("Case", CaseSchema);
