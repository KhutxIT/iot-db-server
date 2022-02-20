const { AuthenException } = require("../exceptions");
const jwt = require('jsonwebtoken')
const auth = require('../config/auth.config');
const { User } = require("../models");

const verifyUser = async (req, res, next) => {
  try {
    let token = req.header('x-access-token');

    if (!token) {
      return next(new AuthenException('Invalid token'))
    }

    // token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, auth.tokenSecret);

    !(decoded || decoded._id) && next(new AuthenException('Invalid token'))

    const user = await User.findOne({ _id: decoded._id });
    if (!user || !user._id) {
      throw new AuthenException('Invalid token');
    }

    req.user = decoded;

    next()
  } catch (err) {
    next(new AuthenException('Invalid token'))
  }
}

module.exports = { 
  verifyUser,
}