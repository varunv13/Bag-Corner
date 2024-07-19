const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const productModel = require('../models/productModel.js');
const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error , success });
});

router.get("/shop", isLoggedIn, async(req, res) => {
    let products = await productModel.find();
    res.render("shop", { products });
});

router.get("/logout", isLoggedIn, (req, res) => {
    res.render("shop");
});

module.exports = router;