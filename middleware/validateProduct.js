const { Validate } = require('../models/productModel');
async function validateProduct(req, res, next) {
    const { error } = Validate(req.body);
    console.log(error);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

module.exports = validateProduct
