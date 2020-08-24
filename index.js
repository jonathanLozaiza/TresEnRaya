var express = require('express');
var http = require('http');
//var app = express();

var app =  require("./socket_express");

app.use('/static',express.static('public'));

app.get('/',function(req,res){
    res.sendFile('index.html',{"root":__dirname});
})

var server = http.Server(app);

app.io.attach(server);

server.listen(6677);
console.log("El servidor funciona correctamente...");