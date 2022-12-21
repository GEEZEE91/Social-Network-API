const  { User, Thoughts  } = require('../models');

// Set up Users Controller
const userController = {
    
    // Create user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // Get all Users
    getUser(req, res) {
        User.find({})
        // populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get single user
    getSingleUser({params}, res) {
        User.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found 
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User found with this ID'});
                return; 
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // Update ser by ID
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    //delete user and all the users thoughts
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: "No User found with this ID" });
            }
            return Thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
          })
          .then(() => {
            res.json({ message: "User and associated thoughts deleted!" });
          })
          .catch((err) => res.json(err));
      },

    // Delete a current user by ID
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this ID'});
                return;
            }
        res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Delete a current Friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = userController; 
