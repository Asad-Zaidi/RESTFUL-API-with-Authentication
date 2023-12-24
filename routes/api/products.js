const express = require("express");
let router = express.Router();
const validateProduct = require("../../middleware/validateProduct");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
var { Product } = require("../../models/productModel");
var cors = require("cors");
const { validate } = require("@hapi/joi/lib/base");
router.use(cors());

router.get("/",auth, async (req, res) => {
    console.log(req.user);
    let page = req.query.page ? req.query.page : 1;
    let perPage = req.query.perPage ? req.query.perPage : 10;
    let skip = ((page - 1) * perPage);
    let products = await Product.find().skip(skip).limit(perPage);
    return res.send(products);
});

router.get("/:id",auth, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product)
            return res.status(400).send("Product with given ID is not Available...!!!");
        return res.send(product);
    }
    catch (err) {
        return res.status(400).send("Invalid ID...!!!");
    }
});

router.put("/:id",auth, validateProduct, async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.Model = req.body.Model;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
});

router.delete('/:id', auth, async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});

router.post("/",auth, validateProduct, async (req, res) => {
    let product = new Product();
    product.title = req.body.title;
    product.Model = req.body.Model;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
});

module.exports = router;
