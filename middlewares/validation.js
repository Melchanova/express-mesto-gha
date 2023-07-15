const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/regex');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateChangeUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateChangeUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegex),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateCreateCard,
  validateCardId,
  validateGetUserById,
  validateChangeUser,
  validateChangeUserAvatar,
};
