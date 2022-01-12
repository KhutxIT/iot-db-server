const AuthMiddleware = require('./auth-middleware')
const ErrorHandleMiddleware = require('./error-handle-middleware')
const ErrorLogsMiddleware = require('./error-logs-middleware')

module.exports = {
  AuthMiddleware,
  ErrorHandleMiddleware,
  ErrorLogsMiddleware,
}