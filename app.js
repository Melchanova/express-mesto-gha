const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

const { ERROR_NOT_FOUND } = require('./errors/errors');

// const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });
app.use(express.json());

// временное решение авторизации
app.use((req, res, next) => {
  req.user = { _id: '649deea8817651a3d3638744' };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
