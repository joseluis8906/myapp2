$(document).ready(function(){
    $(document).foundation();
});

window.onload = function()
{
    var button = document.getElementById ("btnProbar");
    button.onclick = function ()
    {
        // escribir nombre de la aplicacion sin slash
        var app = "user";

        // escribir nombre del método sin slash
        var metodo = document.getElementById("Method").value;

        // el objeto json que se envía
        var objetoJson = {
          FirstName: document.getElementById("FirstName").value,
          LastName: document.getElementById("LastName").value,
          Address: document.getElementById("Address").value,
          Movil: document.getElementById("Movil").value
          //aqui las propiedades que vayan a enviar en el objeto json
        };


        var xhttp = new XMLHttpRequest ();
        xhttp.open ("POST", "/"+app+"/"+metodo+"/");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status == 200)
            {
                Foundation.Motion.animateIn('#tablero', 'fade-in');
                document.getElementById("tablero").innerHTML = JSON.stringify(JSON.parse(xhttp.responseText));
                setTimeout(function (){Foundation.Motion.animateOut('#tablero', 'fade-out');}, 10000);
            }
        };
        xhttp.send (JSON.stringify (objetoJson));
    }
}
