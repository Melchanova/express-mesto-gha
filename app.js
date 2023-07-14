require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/handler-error');
const NotFoundError = require('./errors/not_found-error');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(cookieParser());
// const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });

app.use(express.json());

app.use('/signin', validateLogin, login);
app.use('/signup', validateCreateUser, createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
