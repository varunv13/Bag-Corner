const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const getColors = require('get-image-colors');

require('dotenv').config(); // loads the environment variables from a '.env' file into the 'process.env' object in a node.js application
// When you call require('dotenv').config();, 
// the dotenv package reads the .env file and loads the environment variables into the process.env object. 
// This means that you can access these variables throughout your application using.

const index = require('./routes/index.js');
const ownersRouter = require('./routes/ownersRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const db = require('./config/mongooseConnection.js');

const app = express();

app.use(express.json()); // makes the json data available in the req.body
app.use(express.urlencoded({ extended: true })); // makes the url-encoded data available in the req.body
app.use(cookieParser()); // allows you to manipulate and access cookie data in the application
app.use(express.static(path.join(__dirname, "public"))); // can access the static files present in the public directory
app.use(flash()); // allows developers to store and retreive flash messages
app.set("view engine", "ejs"); // sets the view engine for rendering dynamic HTML templates
app.use(
    session({
        secret: process.env.JWT_KEY,
        resave: false,
        saveUninitialized: false,
    })
); 

// This is for routes
app.use("/", index);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);