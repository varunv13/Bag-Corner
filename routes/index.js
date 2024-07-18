const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const productModel = require('../models/productModel.js');
const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isLoggedIn, async(req, res) => {
    let products = await productModel.find();
    res.render("shop", { products });
});

router.get("/logout", isLoggedIn, (req, res) => {
    res.render("shop");
});

module.exports = router;