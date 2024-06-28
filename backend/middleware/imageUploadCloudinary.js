const catchAsyncError = require("./catchAsyncError");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");
// image a User

exports.imageUpload = catchAsyncError(async (req, res, next) => {
    const file = req.files;
    const fileUri = getDataUri(file.files)
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)
    res.status(200).json({
        public_id: mycloud.public_id,
        url: mycloud.url
    })
});


exports.videoUpload = catchAsyncError(async (req, res, next) => {
    const file = req.files;
    const fileUri = getDataUri(file.files)
    const mycloud = await cloudinary.v2.uploader.upload_large(fileUri.content, { resource_type: "video" })
    res.status(200).json({
        public_id: mycloud.public_id,
        url: mycloud.url
    })
})
