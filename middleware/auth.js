const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/userModel');

async function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(400).send("Access Denied. No token provided.");

    try {
        const decode = jwt.verify(token, config.get("jwtPrivateKey"));
        // req.user = decode;
        req.user = await User.findById(decode._id);
    } catch (err) {
        return res.status(401).send("Invalid token.");
    }
    next();
}

module.exports = auth;
