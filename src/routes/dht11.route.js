var express = require('express');
var router = express.Router();
const Dht11Controller = require('../controllers/dht11.controller');
const { AuthMiddleware } = require('../middlewares')

router
  .route('/')
  .post(AuthMiddleware.verifyUser, Dht11Controller.saveTempAndHumi)

module.exports = router;
