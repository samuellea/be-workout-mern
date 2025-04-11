const express = require('express');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

/* '/' is equivalent to '/api/workouts/'
because we've attached this router to the '/api/workouts' endpoint in backend/server.js */

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a new workout
router.delete('/:id', deleteWorkout);

// UPDATE a new workout
router.patch('/:id', updateWorkout);

module.exports = router;
