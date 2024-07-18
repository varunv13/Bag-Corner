const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    return token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
};

module.exports.generateToken = generateToken; //This type of export is known as named export 
// because you are explicitly exporting a specific function or value