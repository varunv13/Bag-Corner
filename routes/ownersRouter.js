const express = require('express');
const router = express.Router();
const { registerOwner } = require('../controllers/ownersController.js');

// console.log(process.env.NODE_ENV);
// This route will only exist untill the environment is under development
if(process.env.NODE_ENV === "development"){ // IF THIS IS TRUE
    router.post("/create", registerOwner);
}


router.get("/admin", (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", { success }); // Correct view name
});

module.exports = router;