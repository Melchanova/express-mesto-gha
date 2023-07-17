const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretKey } = require('../utils/regex');

const ConflictError = require('../errors/conflict-error');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not_found-error');

// GET-запрос на URL /users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((userX) => {
      res.send({
        name: userX.name,
        about: userX.about,
        avatar: userX.avatar,
        email: userX.email,
      });
    })

    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new ValidationError('Переданы некорректные данные пользователя'),
        );
      }

      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с таким email уже существует'),
        );
      }

      next(err);
    });
};

// GET-запрос на URL /users/:id
const getUserById = (req, res, next) => {
  const { id } = req.params; // доступ к значениям  переданным в URL

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        next(res.send(user));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданные данные некорректы'));
        return;
      }
      next(err);
    });
};

// PATCH-запрос на URL /users/me
const changeUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

// PATCH-запрос на URL /users/me/avatar
const changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })

        .send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserInfo,
  createUser,
  getUserById,
  changeUser,
  changeUserAvatar,
  login,
};
