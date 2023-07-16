const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { ERROR_DEFAULT } = require('./errors/default-error');
const NotFoundError = require('./errors/not_found-error');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

// временное решение авторизации
// app.use((req, res, next) => {
//   req.user = { _id: '649deea8817651a3d3638744' };

//   next();
// });
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT } = err;
  const message = statusCode === ERROR_DEFAULT ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(3000, () => {
  console.log('Сервер подключён');
});
