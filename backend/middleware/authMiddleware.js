const jwt = require('jsonwebtoken')
const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorhandler');
require("dotenv").config({ path: "config/.env" });

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(' ')[1];
        //decoded token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
         return next();

    }
    else {
        return next(new ErrorHandler(`Not authorized, token failed`, 401))
    }
})
module.exports = protect;