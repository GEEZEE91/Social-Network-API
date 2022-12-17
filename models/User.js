const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        //REGEX  validate email
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
      },
      thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
      friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
      }]
    },
    {
        toJSON: {
            virtual: true,
            getters: true,
        },
        id: false
    }
  );
  
  // Create a virtual property friendCount that gets the amount friends a user has
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
  const Users = model('users', userSchema);
  
  module.exports = Users;
  