import { Schema, Document, model } from "mongoose";

export interface IDoc extends Document {
  monitoringReports?: string[]; // Duruşma İzleme Raporları (S3 linkleri)
  petitions?: string[]; // Dilekçeler (S3 linkleri)
  transcripts?: string[]; // Duruşma Tutanakları (S3 linkleri)
}

const DocSchema: Schema = new Schema({
  monitoringReports: { type: [String], required: false },
  petitions: { type: [String], required: false },
  transcripts: { type: [String], required: false },
});

export default model<IDoc>("Doc", DocSchema);
