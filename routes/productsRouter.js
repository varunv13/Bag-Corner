const express = require("express");
const router = express.Router();
const upload = require('../config/multerConfig.js');
const { createProducts } = require('../controllers/productController.js');

router.post("/create", upload.single("image"), createProducts);

module.exports = router;