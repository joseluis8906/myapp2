var express = require('express');
var router = express.Router();

var db = require('../models/index');
var User = require('../models/user');
var UserInfo = require('../models/userinfo');

//select
router.post('/select/', function(req, res, next) {

  var Data = req.body;
  User.hasOne(UserInfo);

  User.findOne({ where: {FirstName: Data.FirstName}, include: [UserInfo]})
  .then(result => {
      res.json(result);
  });
  //res.json({Result: 1});
});

//insert
router.post('/insert/', function(req, res, next) {

  var Data = req.body;

  User.hasOne(UserInfo);

  User.create ({
      FirstName: Data.FirstName,
      LastName: Data.LastName,
      UserInfo: {
        Address: Data.Address,
        Movil: Data.Movil
      }
  },
  {
    include: [UserInfo]
  }
  )
  .then(() => {
      res.json({Result: 1});
  });
});

//update
router.post('/update/', function(req, res, next) {

  var Data = req.body;
  User.hasOne(UserInfo);

  User.findOne ({where: {
      FirstName: Data.FirstName,
  }, include: [UserInfo]})
  .then(R => {
      R.LastName = Data.LastName;
      R.UserInfo.Address = Data.Address;
      R.UserInfo.Movil = Data.Movil;
      R.save();
      R.UserInfo.save();
      res.json({Result: 1});
  });
});

//delete
router.post('/delete/', function(req, res, next) {

  var Data = req.body;

  User.findOne ({where: {
      FirstName: Data.FirstName,
  }})
  .then(R => {
      R.destroy();
      res.json({Result: 1});
  });
});

module.exports = router;
