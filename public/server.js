var express = require('express');
var bodyParser = require('body-parser');
var parser = require('./parser.js');
var app = express();

var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));
app.get('/', function (req, res) {
   res.sendFile(path.resolve('index.html'));
})

app.post('/exp',function(req,res) {
    var expression = req.param('expression');
    console.log(expression);
    console.log(parser(expression))
    res.send(parser(expression));
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
})