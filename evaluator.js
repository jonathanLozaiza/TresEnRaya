module.exports = function(user_board){
    var combinaciones = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,6,8],
        [0,4,8],
        [2,4,6]
    ];

    var gano = false;

    combinaciones.forEach(function(combinacion,index){
        if(!gano){
            var perdio = false;
            for(i=0;i<combinacion.length;i++){
                if(!isInArray(user_board,combinacion[i])){
                    perdio = true;
                    break;
                }
            }
            gano = !perdio;
        }
    });

    return gano;
}

function isInArray(arreglo,elemento){
    return arreglo.indexOf(elemento) > -1;
}