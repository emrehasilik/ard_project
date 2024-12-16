import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  nationalId: string;
  username: string;
  password: string;
  mail: string;
  role: string[]; 
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nationalId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mail: {type: String, required: true},
  role: { type: [String], required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
