var Sequelize = require('sequelize');
var db = require('./index');

const User = db.define('User', {
    Id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    FirstName: Sequelize.STRING,
    LastName: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
    schema: 'Auth'
  }
);

module.exports = User;
