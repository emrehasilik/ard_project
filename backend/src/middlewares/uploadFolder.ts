import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760"), // Maksimum dosya boyutu .env'den alınır veya varsayılan 10 MB
  },
  fileFilter: (req, file, cb) => {
    cb(null, true); // Tüm dosyalara izin ver
  },


});

export default upload;
