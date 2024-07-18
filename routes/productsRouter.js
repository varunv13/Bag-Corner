const express = require("express");
const router = express.Router();
const productModel = require('../models/productModel.js');
const upload = require('../config/multerConfig.js');

router.post("/create", upload.single("image"), async (req, res) => {
  try {
        let { name, price, discount, bgColor, panelColor, textColor } = req.body;
        let product = await productModel.create({
          name,
          image: req.file.buffer,
          price,
          discount,
          bgColor,
          panelColor,
          textColor
        }
      );
      req.flash("success", "Product created successfully!!");
      res.redirect("/owners/admin");
  } 
  catch (error) {
    res.send(error.message);
  }

});

module.exports = router;