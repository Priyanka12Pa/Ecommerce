// middleware/upload.js
import multer, { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/var/www/html/backup/priyanka/Ecommerces/Ecommerces/Ecommerce/frontend/public/uploads');
  },
  filename: (req, file, cb) => {
      console.log("file = ", file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, uniqueSuffix + extname(file.fieldname));
    cb(null, file.fieldname + "-" + Date.now()+".jpg")

  },
});

const upload = multer({ storage: storage });

export default upload;