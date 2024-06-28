const mongoose = require('mongoose')

const notificationModel = mongoose.Schema(
    {
        url: { type: String },
        sender_id: { type: String },
        receiver_id: { type: String },
        names: { type: String },
        status: {
            type: Boolean,
            default: true
        },
        time: {
            type: String,
            default: new Date().getHours() + ":" + new Date().getMinutes(),
        },
    },

    {
        timestamps: true
    }
)

const videoNotification = mongoose.model("videoNotification", notificationModel);
module.exports = videoNotification;