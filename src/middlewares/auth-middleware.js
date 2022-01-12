// const { AuthenException } = require("../exceptions");
// const jwt = require('jsonwebtoken')
// const config = require('config');
// const { User } = require("../models");

// const verifyUser = async (req, res, next) => {
//   try {
//     let token = req.header('Authorization');

//     if (!token) {
//       return next(new AuthenException('Invalid token'))
//     }

//     token = token.replace('Bearer ', '');
//     const decoded = jwt.verify(token, config.tokenSecret);

//     !(decoded || decoded._id) && next(new AuthenException('Invalid token'))

//     const user = await User.findOne({ _id: decoded._id });
//     if (!user || !user._id) {
//       throw new AuthenException('Invalid token');
//     }

//     req.user = decoded;

//     next()
//   } catch (err) {
//     next(new AuthenException('Invalid token'))
//   }
// }

// const verifyAdmin = async (req, res, next) => {
//   try {
//     let token = req.header('Authorization');

//     if (!token) {
//       return next(new AuthenException('Invalid token'))
//     }

//     token = token.replace('Bearer ', '');
//     const decoded = jwt.verify(token, config.tokenSecret);

//     !(decoded || decoded._id) && next(new AuthenException('Invalid token'))

//     const user = await User.findOne({ _id: decoded._id });
//     if (!user || !user._id) {
//       throw new AuthenException('Invalid token');
//     }
//     const userRole = user && user.role

//     if (!userRole || `${userRole}` !== 'ADMIN') {
//       throw new AuthenException('Permission deny')
//     }

//     req.user = decoded;

//     next()
//   } catch (err) {
//     next(new AuthenException('Invalid token'))
//   }
// }

// module.exports = { 
//   verifyUser,
//   verifyAdmin
// }