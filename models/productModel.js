const mongoose = require("mongoose");
const Joi = require('@hapi/joi');
const { data } = require("jquery");

const productSchema = new mongoose.Schema({
    title: String,
    Model: String,
    price: Number,
    slug: {
        type: String,
        lowercase: true,
    }
});

var Product = mongoose.model("Product", productSchema);

function validateProduct(data) {
    const scheme = Joi.object({
        title: Joi.string().min(3).max(10).required(),
        Model: Joi.string().min(1).max(20).required(),
        price: Joi.number().min(0).required(),
        slug: Joi.string().required()
    });
    return scheme.validate(data);
};

module.exports.Product = Product;
module.exports.Validate = validateProduct;