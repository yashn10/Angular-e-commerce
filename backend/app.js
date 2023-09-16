const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path:'./config.env' });
const port = process.env.PORT;

require('./db/db');

app.use(express.json());
app.use(require('./routes/auth'));


app.listen(port, () => {
    console.log("server running at port number", port);
})
