const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const productModel = require('../models/productModel.js');
const userModel = require('../models/userModel.js');
const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error , success, isLoggedIn: false });
});

router.get("/shop", isLoggedIn, async(req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});

router.get("/addtocart/:productId", isLoggedIn, async(req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success", "Product added to cart successfully");
    return res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async(req, res) => {
    let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

    let totalBill = 0;
    let bill = 0;

    user.cart.forEach((product) => {
        bill = (Number(product.price) + 20) - Number(product.discount);
        totalBill += bill;
    })

    res.render("cart", { user, bill, totalBill });
});

router.get("/logout", isLoggedIn, (req, res) => {
    return res.redirect("/");
});

module.exports = router;