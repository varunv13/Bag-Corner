const mongoose = require('mongoose');

// That's how we handle the error which can occur
mongoose
.connect("mongodb://127.0.0.1:27017/e-commerce") // this will be changed
.then(function(){
    console.log("MongoDB connected!!");
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose.connections;
