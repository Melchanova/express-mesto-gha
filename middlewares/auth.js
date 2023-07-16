const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { secretKey } = require('../utils/regex');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     return handleAuthError(res);
//   }

//   const token = authorization.replace("Bearer ", "");

//   let payload;

//   try {
//     payload = jwt.verify(token, "super-strong-secret");
//   } catch (err) {
//     return handleAuthError(res);
//   }

//   req.user = payload; // записываем пейлоуд в объект запроса

//   next(); // пропускаем запрос дальше
// };
