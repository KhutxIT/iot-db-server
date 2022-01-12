var express = require('express');
var router = express.Router();
const LightOperationsController = require('../controllers/light-operations.controller');

/* GET users listing. */
router
  .route('/')
  .post(LightOperationsController.createLightOperations)
  .get(LightOperationsController.searchLightOperations)

module.exports = router;
