function Socket(gano, nueva_jugada, reinicio, no_te_toca, mensajePosicion, conexion){

    var juego = true;
    var socket = io();
    var self = this;

    self.play = function(posicion){
        socket.emit("nuevo_movimiento",{posicion:posicion})
        movimiento(self.figura(),posicion);
    }

    self.figura = function(){
        if(self.juego==true){
            return "X";
        }else{
            return "O";
        }
    }

    socket.on("connect", function(){
        
        socket.on("init",function(data){
            self.juego = data.figure;
            conexion(self.figura());
        });

        socket.on("won",function(data){
            var figura = data.figure;
            gano(figura);
        })

        socket.on("reset",function(data){
            reinicio();
        })

        socket.on("alguien_tiro",function(data){
            nueva_jugada(data.figure,data.position);
        })

        socket.on("no_te_toca",function(data){
            no_te_toca();
        })
        socket.on("posicion_invalida",function(data){
            mensajePosicion();
        })

    })

}