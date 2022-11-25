import multer from "multer";
// upload single image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    let newfileName = `${Date.now()}_${file.originalname}`;

    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, newfileName);
    } else {
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
export const upload = multer({ storage: storage });
