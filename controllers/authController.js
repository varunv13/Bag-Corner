const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken.js')

module.exports.registerUser = async(req, res) => {
    try{    
        let { fullName, email, password } = req.body;

        if(!(email) || !(fullName) || !(password)) {
            req.flash("error", "Fields Required");
            res.redirect("/");
        }
        else{
            let previousUser = await userModel.findOne({ email });

            if(previousUser){
                req.flash("error", "User already exist");
                res.redirect("/");
            }

            else{
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, async (err, hash) => {
                            if(err) res.status(500).send(err.message);
                            else{
                                    let user = await userModel.create({
                                        fullName,
                                        email,
                                        password: hash,
                                    });

                                    let token = generateToken(user);
                                    res.cookie("token", token);
                                    req.flash("success", "User Successfully Created!!")
                                    res.redirect("/");
                                }
                            }
                        );
                    }
                );
            }
        }


    }
    catch(err){
        res.send(err.message);
    }
};

module.exports.loginUser = async(req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });

    if(!user){ 
        req.flash("error", "Email or Password is incorrect")
        res.redirect("/");
    }
    else{
        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                let token = generateToken(user);
                res.cookie("token", token);
                res.status(200).redirect("/shop");
            }
            else {
                req.flash("error", "Email or Password is incorrect")
                res.redirect("/");
            }
        });
    }
};

module.exports.logoutUser = (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
};