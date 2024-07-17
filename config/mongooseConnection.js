const mongoose = require('mongoose');
const config = require('config');

// We are using debugger here.
const debug = require('debug')("development:mongoose"); 
// just after requiring the package, we can call the function by mentioning it's namespace
// (production/developemt phase_status: message going to come from which file)
// So untill the environment variables are not set-up, noting will be printed


// That's how we handle the error which can occur
const mongodbUri = `${config.get('MONGODB_URI')}/e-commerce`; // this works on the basis of what's the value of the environment variables

mongoose
.connect(mongodbUri) // this will be changed
.then(function(){
    // console.log("It's working");
    debug("connected");
})
.catch((err) => {
    debug(err);
});

module.exports = mongoose.connections;
