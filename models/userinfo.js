var Sequelize = require('sequelize');
var db = require('./index');

var User = require('./user');

const UserInfo = db.define('UserInfo', {
    UserId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      references: {
          Model: User,
          Key: 'Id'
      }
    },
    Address: Sequelize.STRING,
    Movil: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
    schema: 'Auth'
  }
);

UserInfo.belongsTo(User);

module.exports = UserInfo;
