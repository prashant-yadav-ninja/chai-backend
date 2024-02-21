import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.resolve(__dirname, "../public/temp"));

    // cb(null,path.resolve(multer.middleware.js,'src\middlewares\multer.middleware.js'))
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    // cb(null, file.fieldname);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
