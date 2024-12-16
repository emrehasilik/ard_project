import mongoose, { Schema, Document } from "mongoose";

export interface IViolation extends Document {
  scanningPeriod: string; // Tarama Dönemi
  eventCategory: string; // Olay Kategorisi
  eventSummary: string; // Olay Özeti
  source?: string; // Kaynak (Web sitesi, gazete vb.)
  link?: string; // Genel Link
  visualLink?: string; // Görsel Link
  uploadedFiles?: string[]; // Dosya Yükleme (S3 linkleri)
  reportingOrganization?: string; // Bildirim Kurumu
  takenByCommission?: string; // Vakanın Alındığı Komisyon
  publicInstitution?: string; // Kamu Kurumu
  dataCategory: "media" | "ngo" | "barCommission" | "publicInstitution"; // Veri Kategorisi
}

const ViolationSchema: Schema = new Schema({
  scanningPeriod: { type: String, required: true }, // Tarama Dönemi
  eventCategory: { type: String, required: true }, // Olay Kategorisi
  eventSummary: { type: String, required: true }, // Olay Özeti
  source: { type: String }, // Kaynak
  link: { type: String }, // Genel Link
  visualLink: { type: String }, // Görsel Link
  uploadedFiles: { type: [String] }, // Dosya Yükleme
  reportingOrganization: { type: String }, // Bildirim Kurumu
  takenByCommission: { type: String }, // Vakanın Alındığı Komisyon
  publicInstitution: { type: String }, // Kamu Kurumu
  dataCategory: {
    type: String,
    enum: ["media", "ngo", "barCommission", "publicInstitution"],
    required: true,
  }, // Veri Kategorisi
});

export default mongoose.model<IViolation>("Violation", ViolationSchema);
