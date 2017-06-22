$(document).ready(function(){
    $(document).foundation();
    $("select").change(selectPlaceholder);
});

window.onload = function()
{
    var button = document.getElementById ("btnProbar");
    button.onclick = function ()
    {
        // escribir nombre de la aplicacion sin slash
        var app = 'giscuvi';

        // escribir nombre del método sin slash
        var metodo = GetValue("Method");

        // el objeto json que se envía
        var objetoJson = {
          Numero: GetValue("Numero"),
          NumeroInterno: GetValue("NumeroInterno"),
          Material: GetValue("Material"),
          Capacidad: GetValue("Capacidad"),
          ClaseProducto: GetValue("ClaseProducto"),
          NormaTecnica: GetValue("NormaTecnica"),
          Propietario: GetValue("Propietario"),
          Presion: GetValue("Presion"),
          AlturaConValvula: GetValue("AlturaConValvula"),
          PesoConValvula: GetValue("PesoConValvula"),
          Valvula: GetValue("Valvula"),
          TipoValvula: GetValue("TipoValvula"),
          AcabadoColor: GetValue("AcabadoColor"),
          Proveedor: GetValue("Proveedor"),
          FechaCompra: GetValue("FechaCompra"),
          Garantia: GetValue("Garantia"),
          FechaFabricacion: GetValue("FechaFabricacion"),
          PruebaHidrostatica: GetValue("PruebaHidrostatica"),
          Alquilado: GetValue("Alquilado"),
          FechaAlquiler: GetValue("FechaAlquiler"),
          Observaciones: GetValue("Observaciones")
          //aqui las propiedades que vayan a enviar en el objeto json
        };


        var xhttp = new XMLHttpRequest ();
        xhttp.open ("POST", "/"+app+"/"+metodo+"/");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status == 200)
            {
                //console.log (JSON.parse(xhttp.responseText));
                Response(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.send (JSON.stringify (objetoJson));
    }
}

function selectPlaceholder ()
{
   if (this.value == '')
   {
     $(this).addClass('placeholder');
   }
   else
   {
     $(this).removeClass('placeholder');
   }
}

function GetValue (Id)
{
    var value = document.getElementById(Id).value;
    return (value == '') ? null : value;
}

function SelectSetValue (Id, Value)
{
    $(Id+" option").each(function() { this.selected = (this.value == Value);});

    var Elemento = $(Id);
    if (Elemento.val() !== '')
    {
        Elemento.removeClass('placeholder');
    }
    else
    {
        Elemento.addClass('placeholder');
    }
}

function Response (Res)
{
    if(Res === null)
    {
      $("#NumeroInterno").val('');
      $("#Material").val('');
      $("#Capacidad").val('');
      $("#ClaseProducto").val('');
      $("#NormaTecnica").val('');
      $("#Propietario").val('');
      $("#Presion").val('');
      $("#AlturaConValvula").val('');
      $("#PesoConValvula").val('');
      SelectSetValue("#Valvula", '');
      $("#TipoValvula").val('');
      $("#AcabadoColor").val('');
      $("#Proveedor").val('');
      $("#FechaCompra").val('');
      SelectSetValue("#Garantia", '');
      $("#FechaFabricacion").val('');
      SelectSetValue("#PruebaHidrostatica", '');
      SelectSetValue("#Alquilado", '');
      $("#FechaAlquiler").val('');
      $("#Observaciones").val('');
      return;
    }

    if(Res.Result)
    {
        Foundation.Motion.animateIn('#tablero', 'fade-in');
        $("#tablero").text(JSON.stringify(Res));
        setTimeout(function (){Foundation.Motion.animateOut('#tablero', 'fade-out');}, 10000);

        $("#Numero").val('');
        $("#NumeroInterno").val('');
        $("#Material").val('');
        $("#Capacidad").val('');
        $("#ClaseProducto").val('');
        $("#NormaTecnica").val('');
        $("#Propietario").val('');
        $("#Presion").val('');
        $("#AlturaConValvula").val('');
        $("#PesoConValvula").val('');
        SelectSetValue("#Valvula", '');
        $("#TipoValvula").val('');
        $("#AcabadoColor").val('');
        $("#Proveedor").val('');
        $("#FechaCompra").val('');
        SelectSetValue("#Garantia", '');
        $("#FechaFabricacion").val('');
        SelectSetValue("#PruebaHidrostatica", '');
        SelectSetValue("#Alquilado", '');
        $("#FechaAlquiler").val('');
        $("#Observaciones").val('');
    }
    else
    {
        $("#NumeroInterno").val(Res.NumeroInterno);
        $("#Material").val(Res.Material);
        $("#Capacidad").val(Res.Capacidad);
        $("#ClaseProducto").val(Res.ClaseProducto);
        $("#NormaTecnica").val(Res.NormaTecnica);
        $("#Propietario").val(Res.Propietario);
        $("#Presion").val(Res.EnvaseComplementaryInfo.Presion);
        $("#AlturaConValvula").val(Res.EnvaseComplementaryInfo.AlturaConValvula);
        $("#PesoConValvula").val(Res.EnvaseComplementaryInfo.PesoConValvula);
        SelectSetValue("#Valvula", Res.EnvaseComplementaryInfo.Valvula);
        $("#TipoValvula").val(Res.EnvaseComplementaryInfo.TipoValvula);
        $("#AcabadoColor").val(Res.EnvaseComplementaryInfo.AcabadoColor);
        $("#Proveedor").val(Res.EnvaseGeneralidades.Proveedor);
        $("#FechaCompra").val(Res.EnvaseGeneralidades.FechaCompra);
        SelectSetValue("#Garantia", Res.EnvaseGeneralidades.Garantia);
        $("#FechaFabricacion").val(Res.EnvaseGeneralidades.FechaFabricacion);
        SelectSetValue("#PruebaHidrostatica", Res.EnvaseGeneralidades.PruebaHidrostatica);
        SelectSetValue("#Alquilado", Res.EnvaseGeneralidades.Alquilado);
        $("#FechaAlquiler").val(Res.EnvaseGeneralidades.FechaAlquiler);
        $("#Observaciones").val(Res.EnvaseGeneralidades.Observaciones);
    }
}
