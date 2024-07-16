const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: Number,
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    },
    profilepic: String
});

module.exports = mongoose.model("user", userSchema);

