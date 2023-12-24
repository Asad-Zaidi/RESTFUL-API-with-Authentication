function admin(req, res, next) {
    if (req.user.role == "admin") {
        next();
    } else {
        return res.status(401).send("You are not Authorized");
    }
};

module.exports = admin