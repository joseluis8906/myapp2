var Sequelize = require('sequelize');
var Moment = require('moment');
var db = require('./index');

var Envase = require('./envase');

const EnvaseGeneralidades = db.define('EnvaseGeneralidades', {
    EnvaseId: {type: Sequelize.BIGINT, primaryKey: true, references: {Model: Envase, Key: 'Id'}},
    Proveedor: Sequelize.STRING,
    FechaCompra: {type: Sequelize.DATEONLY, get: function(){var value=this.getDataValue('FechaCompra');return(value!==null)?Moment.utc(value).format('YYYY-MM-DD'):null}},
    Garantia: Sequelize.STRING,
    FechaFabricacion: {type: Sequelize.DATEONLY, get: function(){var value=this.getDataValue('FechaFabricacion');return(value!==null)?Moment.utc(value).format('YYYY-MM-DD'):null}},
    PruebaHidrostatica: Sequelize.STRING,
    Alquilado: Sequelize.STRING,
    FechaAlquiler: {type: Sequelize.DATEONLY, get: function(){var value=this.getDataValue('FechaAlquiler');return(value!==null)?Moment.utc(value).format('YYYY-MM-DD'):null}},
    Observaciones: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    schema: 'Gis'
  }
);

EnvaseGeneralidades.belongsTo(Envase);
Envase.hasOne(EnvaseGeneralidades, {as: 'EnvaseGeneralidades', foreignKey: 'EnvaseId'});

module.exports = EnvaseGeneralidades;
