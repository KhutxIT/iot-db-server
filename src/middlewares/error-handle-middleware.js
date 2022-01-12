const { AppException, AuthenException } = require("../exceptions");

const ErrorHandleMiddleware = (err, req, res, next) => {
  const response = {
    message: err.message ,
    data: null
  }
  let code = 500

  if (err instanceof AuthenException) { 
    code = 401
  } else if (err instanceof AppException) {
    code = 500
  } else {
    code = 500
  }
  
  return res.status(code).json(response)
}

module.exports = ErrorHandleMiddleware;