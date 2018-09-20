const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const home = require("./backend/routes/HomeRoute");
const database = require("./backend/model/crud");


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.engine("html", handlebars({
	partialsDir: __dirname + "/backend/view",
	extname:".html"
}));
app.set("view engine", "html");

app.use(express.static(__dirname + "/public"));

app.use("/", home);

module.exports = app;
