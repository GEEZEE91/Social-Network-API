const router = require('express').Router();

//  userController
const {
    getUser, createUser,
    getSingleUser, updateUser, deleteUser,
    addFriend, removeFriend
  } = require('../../controllers/userController');

// api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:id 
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

//  api/user/:userId/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend)


module.exports = router;