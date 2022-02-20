var express = require('express');
var router = express.Router();
const LightOperationsController = require('../controllers/light-operations.controller');
const { AuthMiddleware } = require('../middlewares')
router
  .route('/')
  .post(AuthMiddleware.verifyUser, LightOperationsController.createLightOperations)
  .get(AuthMiddleware.verifyUser, LightOperationsController.searchLightOperations)

module.exports = router;
