var express = require('express');
var router = express.Router();

var db = require('../models/index');
var Envase = require('../models/envase');
var EnvaseComplementaryInfo = require('../models/envasecomplementaryinfo');
var EnvaseGeneralidades = require('../models/envasegeneralidades');

//select
router.post('/select/', function(req, res, next) {

  var Data = req.body;

  Envase.findOne({ where: {Numero: Data.Numero}, include: [EnvaseComplementaryInfo, {model: EnvaseGeneralidades, as: 'EnvaseGeneralidades'}]})
  .then(result => {
      res.json(result);
  });
  //res.json({Result: 1});
});

//insert
router.post('/insert/', function(req, res, next) {

  var Data = req.body;

  Envase.create ({
      Numero: Data.Numero,
      NumeroInterno: Data.NumeroInterno,
      Material: Data.Material,
      Capacidad: Data.Capacidad,
      ClaseProducto: Data.ClaseProducto,
      NormaTecnica: Data.NormaTecnica,
      Propietario: Data.Propietario,
      EnvaseComplementaryInfo: {
        Presion: Data.Presion,
        AlturaConValvula: Data.AlturaConValvula,
        PesoConValvula: Data.PesoConValvula,
        Valvula: Data.Valvula,
        TipoValvula: Data.TipoValvula,
        AcabadoColor: Data.AcabadoColor
      },
      EnvaseGeneralidades: {
        Proveedor: Data.Proveedor,
        FechaCompra: Data.FechaCompra,
        Garantia: Data.Garantia,
        FechaFabricacion: Data.FechaFabricacion,
        PruebaHidrostatica: Data.PruebaHidrostatica,
        Alquilado: Data.Alquilado,
        FechaAlquiler: Data.FechaAlquiler,
        Observaciones: Data.Observaciones
      }
  }, {include: [EnvaseComplementaryInfo, {model: EnvaseGeneralidades, as: "EnvaseGeneralidades"}]})
  .then(() => {
      res.json({Result: 1});
  });
});


//update
router.post('/update/', function(req, res, next) {

  var Data = req.body;

  Envase.findOne ({where: {
      Numero: Data.Numero,
  }, include: [EnvaseComplementaryInfo, {model: EnvaseGeneralidades, as: "EnvaseGeneralidades"}]})
  .then(R => {
      R.NumeroInterno = Data.NumeroInterno,
      R.Material = Data.Material,
      R.Capacidad = Data.Capacidad,
      R.ClaseProducto = Data.ClaseProducto,
      R.NormaTecnica = Data.NormaTecnica,
      R.Propietario = Data.Propietario,
      R.EnvaseComplementaryInfo.Presion = Data.Presion,
      R.EnvaseComplementaryInfo.AlturaConValvula = Data.AlturaConValvula,
      R.EnvaseComplementaryInfo.PesoConValvula = Data.PesoConValvula,
      R.EnvaseComplementaryInfo.Valvula = Data.Valvula,
      R.EnvaseComplementaryInfo.TipoValvula = Data.TipoValvula,
      R.EnvaseComplementaryInfo.AcabadoColor = Data.AcabadoColor
      R.EnvaseGeneralidades.Proveedor = Data.Proveedor,
      R.EnvaseGeneralidades.FechaCompra = Data.FechaCompra,
      R.EnvaseGeneralidades.Garantia = Data.Garantia,
      R.EnvaseGeneralidades.FechaFabricacion = Data.FechaFabricacion,
      R.EnvaseGeneralidades.PruebaHidrostatica = Data.PruebaHidrostatica,
      R.EnvaseGeneralidades.Alquilado = Data.Alquilado,
      R.EnvaseGeneralidades.FechaAlquiler = Data.FechaAlquiler,
      R.EnvaseGeneralidades.Observaciones = Data.Observaciones
      R.save();
      R.EnvaseComplementaryInfo.save();
      R.EnvaseGeneralidades.save();
      res.json({Result: 1});
  });
});

//delete
router.post('/delete/', function(req, res, next) {

  var Data = req.body;

  Envase.findOne ({where: {
      Numero: Data.Numero,
  }})
  .then(R => {
      R.destroy();
      res.json({Result: 1});
  });
});

module.exports = router;
