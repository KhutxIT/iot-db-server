const router = require('express').Router();
const lightOperationsRoute = require('./light-operations.route');
const lightRoute = require('./light.route');
const authRoute = require('./auth.route');
const sersorRoute = require('./sensor.route');
const dht11Route = require('./dht11.route');

const { ErrorHandleMiddleware, ErrorLogsMiddleware } = require('../middlewares')

router.use('/lights', lightRoute)
router.use('/lights/operations', lightOperationsRoute)
router.use('/', authRoute)
router.use('/sensor', sersorRoute)
router.use('/dht11', dht11Route)

router.use([
  ErrorLogsMiddleware,
  ErrorHandleMiddleware
])

module.exports = router;
