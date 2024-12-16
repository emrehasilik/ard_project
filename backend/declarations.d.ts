// declarations.d.ts
import { User } from "./src/models/user"; // Kullanıcı modelinizi import edin

declare global {
  namespace Express {
    interface Request {
      user: User; // req.user özelliğini tanımlıyoruz
    }
  }
}
