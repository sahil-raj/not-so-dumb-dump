const express = require("express");
const app = express();
const router = require("./router.js");

var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());

app.use(router);
app.use(express.static("src"));

app.listen(3001);