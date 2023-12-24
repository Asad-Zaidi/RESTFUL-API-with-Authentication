const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

var User = mongoose.model("Product", userSchema);

module.exports = User;