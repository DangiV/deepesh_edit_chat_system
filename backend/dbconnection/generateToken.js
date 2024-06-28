const jwt = require('jsonwebtoken')
require("dotenv").config({ path: "config/.env" });

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

module.exports = generateToken;