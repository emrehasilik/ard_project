
// declarations.d.ts
import { Document } from 'mongoose';
import { User as UserModel } from './src/models/user'; // User modelini doğru bir şekilde import edin

declare global {
  namespace Express {
    interface Request {
      user?: Document<any, any, UserModel> & UserModel & { _id: string }; // req.user özelliğini mongoose tipiyle genişletiyoruz
      userId?: string; // req.userId özelliğini de tanımlayabilirsiniz
    }
  }
}