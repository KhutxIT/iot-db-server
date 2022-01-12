const router = require('express').Router();
const lightOperationsRoute = require('./light-operations.route');
const lightRoute = require('./light.route');

const { ErrorHandleMiddleware, ErrorLogsMiddleware } = require('../middlewares')

router.use('/lights', lightRoute)
router.use('/lights/operations', lightOperationsRoute)

router.use([
  ErrorLogsMiddleware,
  ErrorHandleMiddleware
])

module.exports = router;
