const catchAsyncError = require("../middleware/catchAsyncError");
const videoNotification = require("../model/videoNotification");

const postVideoNotification = catchAsyncError(async (req, res, next) => {
    const { url, sender_id, receiver_id, names } = req.body;
    const info = {
        url,
        sender_id,
        receiver_id,
        names
    }
    const data = await videoNotification.create(info)
    res.status(200).json({ message: "Notification send successful", data: data })
})

const getVideoNotification = catchAsyncError(async (req, res, next) => {
    const { receiver_id } = req.body;
    const data = await videoNotification.findOne({ receiver_id })
    res.status(200).json({ message: "Video Notification successful", data: data })
})

const deleteVideoNotification = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    await videoNotification.findByIdAndDelete({ _id: id })
    res.status(200).json({ message: "Delete Notification successful" })
})

const deleteAllVideoNotification = catchAsyncError(async(req,res,next)=>{
    await videoNotification.collection.drop()
    res.status(200).json({message:"All Notification Data Delete Successful"})
})

module.exports = { postVideoNotification, getVideoNotification, deleteVideoNotification,deleteAllVideoNotification }