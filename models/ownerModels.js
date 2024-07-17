const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trime: true,
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    productpic: String,
    gstNo: String
});

module.exports = mongoose.model("owner", ownerSchema);

