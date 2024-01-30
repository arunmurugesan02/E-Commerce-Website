const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const errorMiddle = require("./middleware/error");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const products = require("./route/products");
const auth = require("./route/auth");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use("/api/v1", products);
app.use("/api/v1", auth);

app.use(errorMiddle);

module.exports = app;
