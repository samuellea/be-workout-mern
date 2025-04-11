require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const workoutRoutes = require('./routes/workouts');

const app = express();

// 📦 middleware
app.use(express.json());

app.use(
  cors({
    origin: 'https://workout-mern-sam-lea.netlify.app',
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// 🪢 routes
app.use('/api/workouts/', workoutRoutes); // <-- attaches all the routes in workouts.js to our express app on the api endpoint '/api/workouts'

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
