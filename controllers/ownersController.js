const ownerModel = require('../models/ownerModels.js');

module.exports.registerOwner = async(req, res) => {
    let owners = await ownerModel.find();
    if(owners.length > 0){
        req.flag("error", "Owner exist!!");
        return res.redirect("/shop");
    }

    let { fullName, email, password } = req.body; // de-structing
    let createdOwner = await ownerModel.create({
        fullName,
        email,
        password
    });
    
    return res
    .status(200)
    .redirect("/admin");
};

