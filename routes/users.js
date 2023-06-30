const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me', changeUser);
router.patch('/me/avatar', changeUserAvatar);

module.exports = router;
