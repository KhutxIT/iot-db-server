const { AuthService } = require("../services")
const catchAsync = require('../utils/catchAsync')

const signUp = catchAsync(async (req, res) => {
  let result = await AuthService.signUp(req.body);
  res.json({
    data: result
  })
})

const login = catchAsync(async (req, res) => {
  let result = await AuthService.login(req.body);
  res.json({
    data: result,
    code: 200
  })
})

module.exports = {
  signUp,
  login
}