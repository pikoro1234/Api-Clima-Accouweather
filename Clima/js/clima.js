$(document).ready(function(){
	//https://dataservice.accuweather.com/locations/v1/cities/search?apikey=WRb7k3FeSFkHFzkUDkGdK1ITLfxObTwt&q=barcelona
	tiempo();
});	



function tiempo(){

	var dia = new Array(7);//array para almacenar dias de la semana
	
	dia[0] = "Domingo";
	dia[1] = "Lunes";
	dia[2] = "Martes";
	dia[3] = "Miercoles";
	dia[4] = "Jueves";
	dia[5] = "Viernes";
	dia[6] = "Sabado";

	/*document.getElementById("dia0").innerHTML = (dia[n]);*/

	$.getJSON("https://dataservice.accuweather.com/forecasts/v1/daily/5day/"+cambio_ciudad()+"?apikey=X8cG73DUvjaHY7PI8Aurs8ZPbmjFRA6p&language=es-es&metric=true",function(data){
		var d = new Date();//extyraccion de dia actual
		var n = d.getDay(); //num de dia de la semana actual
		/*var mes = d.getDate();
		mes mostrarlo en un iner */
		/*var year = d.getFullYear();
		mostrar en un inner */

		for (var i = 0 ; i <5; i++) {
			var minima = data["DailyForecasts"][i]["Temperature"]["Minimum"]["Value"];
			var maxima = data["DailyForecasts"][i]["Temperature"]["Maximum"]["Value"];
			var icono = data["DailyForecasts"][i]["Day"]["Icon"];
			var textodia= data["DailyForecasts"][i]["Day"]["IconPhrase"];
			var textonoche = data["DailyForecasts"][i]["Night"]["IconPhrase"];
			var icononoche = data["DailyForecasts"][i]["Night"]["Icon"];
	 		var fechas_json = data["DailyForecasts"][i]["Date"]; //una variable donde almacenamos lo que esta en el json

			document.getElementById("minima"+i).innerHTML = minima;
			document.getElementById("maxima"+i).innerHTML = maxima;
			document.getElementById("iconodia"+i).src = "iconos/"+icono+".png";
			document.getElementById("icononoche"+i).src = "iconos/"+icononoche+".png";
			document.getElementById("dia"+i).innerHTML = textodia;
			document.getElementById("noche"+i).innerHTML = textonoche;
			document.getElementById("fecha"+i).innerHTML = conversor_fechas(fechas_json); //recibo de funcion y mostrado en HTML


			if (n > 6 )//aqui usamos condicion para que la semana se vuelva a reiniciar
			{ 
			n=0;  // reinicio de semana
				  //dia[1];
			}
			document.getElementById("dias"+i).innerHTML = ("n:"+n+"-"+dia[n]); //imprimide de dias mediante n concatenado

			n++; /////sumado de dias para despues de reinicio
			/*alert(n);*/
			}
	});	
}

function cambio_ciudad(){
	var selector = document.getElementById("selected").value;
	return selector
}
//santa cruz de la sierra 36300
//la paz 33655
//sucre 32544

//barcelona 307297
//madrid 308526
//sevilla 2330265
//bilbao 309382
//badajoz 307720

function conversor_fechas(fechas_json) {
  var fecha_bonita = fechas_json.substring(0, 10); //recibido de datos json y tomando valoress y limite para mostrar
  return fecha_bonita; //fecha con el formato que me gusta
}