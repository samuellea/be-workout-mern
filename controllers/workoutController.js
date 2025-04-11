const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
  // {} for all, or eg. {reps: 20} for specific documents <- it's a filter
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); // -1 = desc order
  console.log(workouts);
  res.status(200).json(workouts);
};

// GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: 'Id is not a valid MongoDB ObjectId' });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: 'No such workout with this id' });
  }
  return res.status(200).json(workout);
};

// POST a new workout
const createWorkout = async (req, res) => {
  console.log(req.body);
  const { title, reps, load } = req.body;

  // check if any fields on the req.body are empty - if so, store in 'emptyFields' arr
  const emptyFields = Object.keys(req.body).filter(
    (key) => req.body[key].length === 0
  );

  if (emptyFields.length) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  // add document to db
  // prettier-ignore
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: errorMsg });
  }
};

// DELETE a new workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: 'Id is not a valid MongoDB ObjectId' });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ error: 'No such workout with this id' });
  }
  res.status(200).json(workout);
};

// UPDATE a new workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: 'Id is not a valid MongoDB ObjectId' });
  }

  const { body } = req; // title, reps, load

  // update document on db
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // returns documented as updated, rather than original
  );
  if (!workout) {
    return res.status(400).json({ error: 'No such workout with this id' });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
