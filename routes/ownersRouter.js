const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModels.js');

// console.log(process.env.NODE_ENV);
// This route will only exist untill the environment is under development
if(process.env.NODE_ENV === "development"){ // IF THIS IS TRUE
    router.post("/create", async(req, res) => {
        let owners = await ownerModel.find();
        if(owners.length > 0){
            req.flag("error", "Owner exist!!");
            res.redirect("/shop");
        }

        let { fullName, email, password } = req.body; // de-structing
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password
        });
        res
        .status(200)
        .render("admin");
    });
}

router.get("/create",)

router.get("/admin", (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", { success }); // Correct view name
});

module.exports = router;