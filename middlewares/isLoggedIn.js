const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

module.exports = async (req, res, next) => {
    // If the user is not logged in, then he first needs to login first
    if(!req.cookies.token){
        req.flash("error", "you need to login first"); // displays the flash message in the express.js application
        // flash messages are used to display temp notifications or error messages to the user
        // typically after a specific action or event
        res.redirect("/");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password"); // we will get the details of the user excluding it's password

        req.user = user;
        next();
    } catch (error) {
        req.flash("error", "something went wrong");
        res.redirect("/");
    }
};
