const mongoose = require('mongoose')

const messageModel = mongoose.Schema( 
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, trim: true },
        chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
        time: {
            type: String,
            default: new Date().getHours()  + ":" + new Date().getMinutes(),
        },
    },
   
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message", messageModel);
module.exports = Message;