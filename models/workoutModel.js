const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // automatically adds a timestamp to each document when created using this schema
);

// the Schema defines the structure of a particular document inside our database
// a Model is a class that's built off of a Schema, and gives us an interface to interact with a specific collection inside our database
// we use the model to interact with that collection of the same name

// it automatically creates a collection for us based on this name - pluralizes it + builds that collection in the db for us
// we use methods on the model itself. The Schema defines structure of the documents that we save to that collection.
module.exports = mongoose.model('Workout', workoutSchema);
