    var ids =["6","12","18","24"];
    var gfs_zeros = ["GFS_00","GFS_0","GFS_"];
    var hora = [6,12,18,24];
    var hora_mapa;

    /*
    Cuando la hora es 6 la url es diferente
    Para ello usamos el indice k asociado al array gfs_zeros
    */
    window.addEventListener("load", ini);

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

        /* EVENTOS */
        
        /* Control de la galería*/
        document.getElementById('left_button').onclick = avance_galeria;
        document.getElementById('right_button').onclick = avance_galeria;
        
        // Elementos de la galeria
        document.getElementById("target-6").onclick = ampliar_imagen;
        document.getElementById("target-12").onclick = ampliar_imagen;
        document.getElementById("target-18").onclick = ampliar_imagen;
        document.getElementById("target-24").onclick = ampliar_imagen;
            
        /** Control del elemento ampliado **/
        document.getElementById('left_button_mapa').onclick = avance_mapa;
        document.getElementById('right_button_mapa').onclick = avance_mapa;  
    }    

    //Galeria
    function avance_galeria(event){
        var direccion = (this.id == "left_button") ? -24 : 24;

        hora = hora.map(function(current){return current + direccion;});    

        if(hora[hora.length - 1] == 192){
            direccion = -168;
            hora = hora.map(function(current){return current + direccion;});
        }

        if(hora[0] == -18){
            direccion = 168;
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

    //Elemento ampliado
    function ampliar_imagen(){

        $('#overlay').css('display','block');
        $('#img_mapa').attr('src',this.src);
        hora_mapa = parseInt(this.alt);
        
        console.log(hora_mapa);
    }
   
//Control del elemento ampliado
    function avance_mapa(event){
            console.log(event + " " + this.id + " " + hora_mapa);
            var direccion = (this.id == "left_button_mapa") ? - 6 : 6;
            
            hora_mapa += direccion;
            console.log(hora_mapa);
            if(hora_mapa <= 0) hora_mapa = 168;
            if(hora_mapa > 168) hora_mapa = 6;

            k = (hora_mapa == 6) ? 0 : 1; 
            if (hora_mapa > 96) k = 2;

            $('#img_mapa').attr('src', 'https://services.meteored.com/img/models/gfs/' + gfs_zeros[k] + hora_mapa + '_ESP0_SFC.png');
        event.stopPropagation();
    }
   
$('#overlay').click(function(){ $('#overlay').css('display','none')});
