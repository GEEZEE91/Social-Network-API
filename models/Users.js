const { Schema, model } = require('mongoose');

// Schema to create User model
const usersSchema = new Schema(
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
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
      },
      thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
      friends: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: true,
        timestamps: true,
        
    }
  );
  
  // Create a virtual property friendCount that gets the amount friends a user has
  usersSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
  const User = model('users', usersSchema);
  
  module.exports = User;
  