const express = require('express');

let app = express();

app.get("/", (req, res) => {
    res.send("Hii");
});

app.listen(3000);