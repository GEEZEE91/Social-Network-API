const { Thoughts, User } = require("../models");

const thoughtsController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData)) // Return the data in JSON
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by it's id
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (dbThoughtData) {
        res.json(dbThoughtData); // Return the data in JSON
      }})
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create thought to a user
  createThought({ body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUsesData) {
          res.status(404).json({ message: "No User found" });
          return;
        }
        res.json(dbUserData); // Return the data in JSON
      })
      .catch((err) => res.json(err));
  },

  //update thought by it's id
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);  // Return the data in JSON
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a thought
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);  // Return the data in JSON
      }) 
      .catch((err) => res.status(400).json(err));
  },
  
  // add Reaction
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);  // Return the data in JSON
      })
      .catch((err) => res.json(err));
  },

  //delete Reaction
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },  // Set the id of the thought that is getting deleted
      { $pull: { reactions: { reactionId: params.reactionId } } },  // remove the associated reactions
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;