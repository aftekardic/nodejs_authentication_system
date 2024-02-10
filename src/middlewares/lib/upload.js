const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "images/jpg",
    "image/gif",
    "image/jpeg",
    "image/png",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(
      new Error(
        "This image type is not supported. Please choose a different picture."
      ),
      false
    );
  }

  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);

    fs.mkdirSync(path.join(rootDir, "/public/uploads"), {
      recursive: true,
    });
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    const extention = file.mimetype.split("/")[1];

    if (!req.savedImages) {
      req.savedImages = [];
    }
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let url = `image_${uniqueSuffix}.${extention}`;

    req.savedImages = [...req.savedImages, path.join(url)];

    cb(null, url);
  },
});

const upload = multer({ storage, fileFilter }).array("images");

module.exports = upload;
