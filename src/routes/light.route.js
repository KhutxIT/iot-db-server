var express = require('express');
var router = express.Router();
const LightController = require('../controllers/light.controller');

/* GET users listing. */
router
  .route('/')
  .post(LightController.createLight)
  .delete(LightController.removeLight)
  .put(LightController.updateLight)
  .get(LightController.searchLight);

module.exports = router;
