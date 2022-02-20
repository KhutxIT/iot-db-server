const { AppException, AuthenException } = require("../exceptions");
const bcrypt = require('bcrypt');
const { User } = require("../models");
const jwt = require('jsonwebtoken')
const { tokenSecret, tokenExpires } = require('../config/auth.config')

const registerToken = (data) => {
  const token = jwt.sign(data, tokenSecret, {
    expiresIn: tokenExpires
  })

  return token
}

const signUp = async (data) => {
  const { username } = data;

  const usernameSearch = await User.findOne({ username: username })
  if (usernameSearch && usernameSearch._id)
    throw new AppException('Username already in use');

  // Gen hash password
  const salt = await bcrypt.genSalt(12);
  const hashPass = await bcrypt.hash(data.password, salt);

  // Update new hash password
  data.password = hashPass;

  // Insert new account to DB
  const user = new User(data)
  const result = await user.save()
  // const result = await User.insertMany([accountData]);
  
  // Remove unecessary fields and return result
  if (result) {
    const account = result.toObject()

    delete account.password

    const token = registerToken(account)

    return { ...account, token }
  }

  throw new AppException('Something went wrong!')
}

const login = async (data) => {
  let { username, password } = data
  let result = await User.findOne({ username: username });

  // Do login - Compare password
  if (result) {
    let user = result.toObject();

    let valid = user?.password 
      && await bcrypt.compare(password, user.password)
      || false;    

    if (valid) {
      delete user.password;

      let token = registerToken(user)

      return { ...user, token }
    }

    throw new AuthenException('Please recheck your information.');
  }

  // If phone does not exist - Do sign up
  return await signUp(data)
}

module.exports = {
  signUp,
  login
}