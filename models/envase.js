var Sequelize = require('sequelize');
var db = require('./index');

const Envase = db.define('Envase', {
    Id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    Numero: Sequelize.INTEGER,
    NumeroInterno: Sequelize.INTEGER,
    Material: Sequelize.STRING,
    Capacidad: Sequelize.DECIMAL,
    ClaseProducto: Sequelize.STRING,
    NormaTecnica: Sequelize.STRING,
    Propietario: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    schema: 'Gis'
  }
);

module.exports = Envase;
