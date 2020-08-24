var express = require('express');
var socket = require('socket.io');
var evaluator = require('./evaluator');

var app = express();
var io = socket();

var posiciones_ocupadas = {};

var turno = true;
var figure = true;

app.io = io;
io.on("connection",function(socket){
    
    posiciones_ocupadas = {};
    socket.broadcast.emit("reset",{});

    console.log("El cliente con ip "+ socket.handshake.address+" esta conectado...");
    //io.emit para enviar info a todos los clientes
    //socket.emit para enviar a solo el socket
    //socket.broadcast.emit envia a todos menos al socket

    socket.emit("init",{figure:figure});
    socket.figure = figure;
    socket.user_board = [];

    figure = !figure;

    socket.on("nuevo_movimiento",function(data){
        //data.posicion => 0,1,2,3,.... 8
        // posiciones_ocupadas[0] = true
        //data.posicion = 0
        //posiciones_ocupadas[0]

        if(turno == socket.figure){
            if(!posiciones_ocupadas[data.posicion]){
                socket.user_board.push(parseInt(data.posicion));
                posiciones_ocupadas[data.posicion] = true;
                io.emit("alguien_tiro",{position:data.posicion, figure:socket.figure})

                if(evaluator(socket.user_board)){
                    console.log("Alguien gano");
                    io.emit("won",{figure:socket.figure});
                }

                turno = !turno;

            }else{
                socket.emit("posicion_invalida",{});
            }
            
        }else{
            socket.emit("no_te_toca",{});
        }

    })

})




module.exports = app;