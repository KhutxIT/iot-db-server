var express = require('express');
var router = express.Router();
const SensorController = require('../controllers/sensor.controller');
const { AuthMiddleware } = require('../middlewares')

router
  .route('/')
  .get(AuthMiddleware.verifyUser, SensorController.getDataSensor)

module.exports = router;
