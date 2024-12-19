import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user'; // Doğru yol ile değiştirin

// Kullanıcı Kimlik Doğrulama Middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token'den JWT alınır
  if (!token) {
    return res.status(401).json({ message: 'Yetkilendirme gerekli' });
  }

  try {
    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ message: 'JWT secret key is not defined' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as { id: string };
    req.userId = decoded.id; // Request nesnesine userId ekleniyor
    next();
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
};

// Rol Kontrol Middleware
export const checkRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.userId); // Kullanıcı kimliği üzerinden user çekilir
      if (!user || !user.role.includes(role)) {
        return res.status(403).json({ message: 'Erişim izniniz yok' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Bir hata oluştu' });
    }
  };
};