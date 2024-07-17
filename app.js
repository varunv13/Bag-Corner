const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');

const ownersRouter = require('./routes/ownersRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const db = require('./configs/mongooseConnection.js');

const app = express();

app.use(express.json()); // makes the json data available in the req.body
app.use(express.urlencoded({ extended: true })); // makes the url-encoded data available in the req.body
app.use(cookieParser()); // allows you to manipulate and access cookie data in the application
app.use(express.static(path.join(__dirname, "public"))); // can access the static files present in the public directory
app.set("view engine", "ejs"); // sets the view engine for rendering dynamic HTML templates

// This is for routes
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);