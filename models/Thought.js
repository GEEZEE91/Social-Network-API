const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// reactions schema
const reactionSchema = new Schema(
    {
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdTimeVal) => moment(createdTimeVal).format('DD MMM, YYYY [at] hh:mm a')
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: true,

    }
  );

// thought schema
const thoughtsSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
        minLength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdTimeVal) => moment(createdTimeVal).format('DD MMM, YYYY [at] hh:mm a')
    },
    username : {
        type: String,
        required: true,
    },
    reactions :[reactionSchema],
    
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: true,
  }
);



// get total count of reactions
  thoughtsSchema.virtual('reactionCount').get(function () {return this.reactions.length;});

// create the thoughts model
  const Thoughts = model('Thoughts', thoughtsSchema);

  module.exports = Thoughts;
