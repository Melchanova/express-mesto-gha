const Card = require('../models/card');

const ErrorForbidden = require('../errors/forbidden-error');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not_found-error');

const getInitialCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена');
      if (req.user._id !== card.owner.toString()) {
        throw new ErrorForbidden('Попытка удалить чужую карточку');
      }
      card
        .deleteOne()
        .then(() => res.send(card))
        .catch(next);
    })
    .catch(next);
};

const putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId, // доступ к значениям  URL
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )

    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard,
  getInitialCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
