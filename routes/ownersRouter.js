const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModels.js');

// console.log(process.env.NODE_ENV);
// This route will only exist untill the environment is under development
if(process.env.NODE_ENV === "development"){ // IF THIS IS TRUE
    router.post("/create", async(req, res) => {
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res
            .status(501)
            .send("You don't have the permission to create a new owner");
        }

        let { fullName, email, password } = req.body; // de-structing
        let createdOwner= await ownerModel.create({
            fullName,
            email,
            password
        });
        res
        .status(200)
        .send("We can create a new owner");
    });
}

router.get("/", (req, res) => {
    res.send("Heey");
});

module.exports = router;