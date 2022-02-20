var express = require('express');
var router = express.Router();
const LightController = require('../controllers/light.controller');
const { AuthMiddleware } = require('../middlewares')
router
  .route('/')
  .post(AuthMiddleware.verifyUser, LightController.createLight)
  .delete(AuthMiddleware.verifyUser, LightController.removeLight)
  .put(AuthMiddleware.verifyUser, LightController.updateLight)
  .get(AuthMiddleware.verifyUser, LightController.searchLight);

module.exports = router;
