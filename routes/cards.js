const router = require('express').Router();
const { validateCreateCard, validateCardId } = require('../middlewares/validation');

const {
  createCard,
  getInitialCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/', getInitialCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, putCardLike);
router.delete('/:cardId/likes', validateCardId, deleteCardLike);

module.exports = router;
