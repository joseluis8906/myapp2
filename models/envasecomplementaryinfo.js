var Sequelize = require('sequelize');
var db = require('./index');

var Envase = require('./envase');

const EnvaseComplementaryInfo = db.define('EnvaseComplementaryInfo', {
    EnvaseId: {type: Sequelize.BIGINT, primaryKey: true, references: {Model: Envase, Key: 'Id'}},
    Presion: Sequelize.DECIMAL,
    AlturaConValvula: Sequelize.DECIMAL,
    PesoConValvula: Sequelize.DECIMAL,
    Valvula: Sequelize.STRING,
    TipoValvula: Sequelize.STRING,
    AcabadoColor: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    schema: 'Gis'
  }
);

EnvaseComplementaryInfo.belongsTo(Envase);
Envase.hasOne(EnvaseComplementaryInfo, {foreignKey: 'EnvaseId'});

module.exports = EnvaseComplementaryInfo;
