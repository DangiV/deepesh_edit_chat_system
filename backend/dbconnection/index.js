const mongoose = require("mongoose")
require("dotenv").config({ path: "config/.env" });
const getConnection = () =>{
    mongoose.connect(process.env.DB_URI)
    console.log("db connect ...")
}

module.exports = getConnection;