const express = require("express");
const { imageUpload, videoUpload } = require("../middleware/imageUploadCloudinary");

const router = express.Router();

router.route("/upload_image").post(imageUpload);
router.route("/upload/video").post(videoUpload);

module.exports = router;
