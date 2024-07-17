const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trime: true,
    },
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

