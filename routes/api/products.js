const express = require("express");
let router = express.Router();
const validateProduct = require("../../middleware/validateProduct")
var { Product } = require("../../models/productModel");
var cors = require("cors");
const { validate } = require("@hapi/joi/lib/base");
router.use(cors());
router.get("/", async (req, res) => {
    let products = await Product.find();
    return res.send(products);
});

router.get("/:id", async (req, res) => {
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

router.put("/:id",validateProduct, async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.Model = req.body.Model;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
});

router.delete('/:id', async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});

router.post("/",validateProduct, async (req, res) => {
    let product = new Product();
    product.title = req.body.title;
    product.Model = req.body.Model;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
});

module.exports = router;