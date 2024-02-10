const router = require("express").Router();

const multer = require("multer");
const upload = require("../middlewares/lib/upload");
const auth = require("./auth.routers");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

router.use(auth);

router.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      throw new APIError(
        "There was an error caused by Multer while uploading the image: ",
        err
      );
    } else if (err) {
      throw new APIError("An error occured while uploading the image: ", err);
    } else {
      return new Response(req.savedImages, "Uploading is successful.").success(
        res
      );
    }
  });
});

module.exports = router;
