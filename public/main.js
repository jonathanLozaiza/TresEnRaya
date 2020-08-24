(function(){
    function $(selector){
        return document.querySelector(selector);
    }
    
    var ficha = true;
    
    function jugar(selected){
        if(ficha==true){
            selected.innerHTML = "X";
        }else{
            if(ficha==false){
                selected.innerHTML = "O";
            }
        }
    }
    
    
    function definirEventos(){
        var elements = document.querySelectorAll(".cat-element");
        for(var i = 0; i < elements.length; i++){
            var element = elements[i];
            element.addEventListener('click', function(){
                var posicion = this.id.split("-")[1];
                socket.play(posicion);
            })
        }
    }
    
    
    function buildCat(){
        for(var i = 0; i < 9; i++){
            var item = buildItem(i);
            $("#cat").innerHTML += item;
        }
    
        definirEventos();
    }
    
    function buildItem(i){
        return "<div class='cat-element col-md-4' id='elemento-"+i+"'"+"></div>";
    }
    
    function convertir_a_figura(bandera){
        if(bandera){
            return "X";
        }else{
            return "O";
        }
    }

    function reset(){
        swal("Alguien ingreso","Reiniciaremos el tablero...")
        var elements = document.querySelectorAll('.cat-element');
        for(i=0;i<elements.length;i++){
            elements[i].innerHTML = '';
        }
    }

    buildCat();

    var socket = new Socket(function(figura){
        swal("'"+convertir_a_figura(figura)+"' a ganado la partida...")
    }, function(figura,posicion){
        $("#message").innerHTML = "Es el turno de las "+ convertir_a_figura(!figura); 
        $("#elemento-"+posicion).innerHTML = convertir_a_figura(figura);
    }, function(){
        reset();
    }, function(){
        swal("No te toca tirar","Espera tu turno");
    }, function(){
        swal("No puedes jugar ahi");
    }, function(figura){
        $("#message").innerHTML = "Tu juegas con la "+figura;
        if(figura=="X"){
            $("#message").innerHTML += "<br/> Es tu turno de jugar"; 
        }else{
            $("#message").innerHTML += "<br/> No es tu turno de jugar";
        }
    });

})();


