const router = require('express').Router();
const {
  validateGetUserById,
  validateChangeUser,
  validateChangeUserAvatar,
} = require('../middlewares/validation');

const {
  getUsers,
  getMe,
  getUserById,
  changeUser,
  changeUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:id', validateGetUserById, getUserById);
router.patch('/me', validateChangeUser, changeUser);
router.patch('/me/avatar', validateChangeUserAvatar, changeUserAvatar);

module.exports = router;
