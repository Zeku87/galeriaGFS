//Condiciones iniciales
var ids =["6","12","18","24"];
var gfs_zeros = ["GFS_00","GFS_0","GFS_"];
var hora = [6,12,18,24];
var hora_mapa;

/*
Cuando la hora es 6 la url es diferente
Para ello usamos el indice k asociado al array gfs_zeros
*/
function ini(){
    var i = 0,k = 0;
    for(;i<4;++i)
    {
        k = (hora[i] == 6) ? 0 : 1; 
        if (hora[i] > 96) k = 2;
        
        document.getElementById("target-" + ids[i]).src= "https://services.meteored.com/img/models/gfs/" + gfs_zeros[k] + hora[i] + "_ESP0_SFC.png";
        document.getElementById("target-" + ids[i]).alt= hora[i];
        document.getElementById("p-" + ids[i]).innerHTML="Hora " + hora[i] + " UTC";
    }
}    
    
function avance_galeria(id){
    var direccion = (id == "left_button") ? - 6 : 6;
    
    hora = hora.map(function(current){return current + direccion;});    
    
    if(hora[hora.length - 1] == 174){
        direccion = -150;
        hora = hora.map(function(current){return current + direccion;});
    }
    
    if(hora[0] == 0){
        direccion = 150;
        hora = hora.map(function(current){return current + direccion;});
    }
    
    var i = 0,k = 0;
    for(;i<4;++i)
    {
        k = (hora[i] == 6) ? 0 : 1; 
        if (hora[i] > 96) k = 2;

        document.getElementById("target-" + ids[i]).src= "https://services.meteored.com/img/models/gfs/" + gfs_zeros[k] + hora[i] + "_ESP0_SFC.png";
        document.getElementById("target-" + ids[i]).alt= hora[i];
        document.getElementById("p-" + ids[i]).innerHTML="Hora " + hora[i] + " UTC";
    }   
}

/** mapa ampliado **/

function ampliar_imagen(imagen, hora_mapa){

    $('#overlay').css('display','block');
    $('#img_mapa').attr('src',imagen);
    this.hora_mapa = parseInt(hora_mapa);
}

$('#cerrar_overlay').click(function(){ $('#overlay').css('display','none')});

/** mapa ampliado avances **/

function avance_mapa(id){
        
        var direccion = (id == "left_button_mapa") ? - 6 : 6;
        hora_mapa += direccion;
        
        if(hora_mapa <= 0) hora_mapa = 168;
        if(hora_mapa > 168) hora_mapa = 6;
        
        k = (hora_mapa == 6) ? 0 : 1; 
        if (hora_mapa > 96) k = 2;
        
        $('#img_mapa').attr('src', 'https://services.meteored.com/img/models/gfs/' + gfs_zeros[k] + hora_mapa + '_ESP0_SFC.png');
}