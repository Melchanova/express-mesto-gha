const { DefaultError } = require('../errors/default-error');

module.exports = (err, req, res, next) => {
  const { status = DefaultError, message = 'На сервере произошла ошибка' } = err;

  res.status(status).send({ message });

  next();
};
