var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cors = require('cors');
var graphRoute = require("./routes/routeGraph") ;

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()) ;

app.use('/graph', graphRoute);

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});

console.log("====SERV LANCE=====")
module.exports = app;
