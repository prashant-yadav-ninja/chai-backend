import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;

// The req.files object is populated by a middleware such as multer or express-fileupload when a multipart/form-data request is received. This object contains the files that were uploaded as part of the request. The data populated in req.files is an array of objects, where each object represents an uploaded file.

// Each file object has the following properties:

// fieldname: The name of the form field that the file was uploaded with.

// originalname: The original name of the file on the client's computer.

// encoding: The encoding of the file.

// mimetype: The mime type of the file.

// destination: The destination directory for the file.

// filename: The name of the file on the server.

// path: The full path of the file on the server.

// size: The size of the file in bytes.
