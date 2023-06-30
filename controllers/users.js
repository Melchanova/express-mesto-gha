const User = require('../models/user');

const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
} = require('../errors/errors');

// GET-запрос на URL /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

// GET-запрос на URL /users/:id
const getUserById = (req, res) => {
  const { id } = req.params; // доступ к значениям  переданным в URL

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// POST-запрос на URL /users
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// обновление данных пользователя
const changeUserFields = (req, res, updateFields) => {
  User.findByIdAndUpdate(req.user._id, updateFields, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// PATCH-запрос на URL /users/me
const changeUser = (req, res) => {
  const { name, about } = req.body;
  changeUserFields(req, res, { name, about });
};

// PATCH-запрос на URL /users/me/avatar
const changeUserAvatar = (req, res) => {
  const { avatar } = req.body;
  changeUserFields(req, res, { avatar });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeUserAvatar,
};
