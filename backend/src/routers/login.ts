import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.BAR_ASSOCIATION_USERNAME &&
    password === process.env.BAR_ASSOCIATION_PASSWORD
  ) {
    res.status(200).json({ message: 'Giriş başarılı!' });
  } else {
    res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre!' });
  }
});

export default router;
