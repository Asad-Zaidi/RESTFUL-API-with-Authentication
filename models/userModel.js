const mongoose = require("mongoose")
const Joi = require('@hapi/joi');
const bcrypt = require("bcrypt");
const { data } = require("jquery");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user",
    }
});

// Validation
userSchema.methods.generateHashPassword = async function(){
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}
var User = mongoose.model("User", userSchema);

function validateUser(data) {
    const scheme = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required()
    });
    return scheme.validate(data);
};

function validateUserLogin(data) {
    const scheme = Joi.object({
        email: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required()
    });
    return scheme.validate(data);
};

module.exports = { User };
module.exports.Validate = validateUser //SIGNUP
module.exports.ValidateLogin = validateUserLogin //LOGIN