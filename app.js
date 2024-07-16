const express = require('express');
const cookieParser = require('cookieparser');
const path = require('path');

const app = express();

app.use(express.json()); // makes the json data available in the req.body
app.use(express.urlencoded({ extended: true })); // makes the url-encoded data available in the req.body
app.use(cookieParser()); // allows you to manipulate and access cookie data in the application
app.use(express.static(path.join(__dirname, "public"))); // can access the static files present in the public directory
app.use("view engine", "ejs"); // sets the view engine for rendering dynamic HTML templates


app.get("/", (req, res) => {
    res.send("Hii");
});

app.listen(3000);