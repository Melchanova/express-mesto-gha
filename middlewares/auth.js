const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { secretKey } = require('../utils/regex');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, secretKey);
    } catch (err) {
      return next(new AuthError('Необходимо авторизоваться'));
    }

    req.user = payload;

    next();
  } else {
    return next(new AuthError('Необходимо авторизоваться'));
  }
};

module.exports = auth;
