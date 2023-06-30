const router = require('express').Router();
const {
  createCard,
  getInitialCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/', getInitialCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putCardLike);
router.delete('/:cardId/likes', deleteCardLike);

module.exports = router;
