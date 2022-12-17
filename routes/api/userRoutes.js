const router = require('express').Router();

//  usersController
const {
    getUsers, createUser,
    getSingleUser, updateUser, deleteUser,
    addFriend, removeFriend
  } = require('../../controllers/usersController');

// api/users 
router.route('/').get(getUsers).post(createUser);

// /api/users/:id 
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

//  api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend)


module.exports = router; 