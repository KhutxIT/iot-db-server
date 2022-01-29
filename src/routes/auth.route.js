var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/auth.controller');

router
  .route('/login')
  .post(AuthController.login)

router
  .route('/signup')
  .post(AuthController.signUp)

module.exports = router;
