// npm install dotenv
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); // Importing CORS

const workoutRoutes = require('./routes/workouts');

// express app - this is our API
const app = express();

// 📦 middleware
app.use(express.json()); // this will parse any bodies coming in on requests as JSON, and attaches that on the request object as req.body, so we can access it in the request handlers on our routes

// Use CORS to allow requests only from our frontend on Netlify
app.use(
  cors({
    origin: 'https://workout-mern-sam-lea.netlify.app', // Use our Netlify frontend URL here
  })
);

app.use((req, res, next) => {
  // this will fire for every request that comes in to our express app
  console.log(req.path, req.method);
  next();
});

// 🪢 routes
app.use('/api/workouts/', workoutRoutes); // <-- attaches all the routes in workouts.js to our express app on the api endpoint '/api/workouts'

// 🥭 connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // 📡 listen for requests on port 4000, only AFTER we've connected to MongoDB
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    // <-- This should be `.catch()` to properly handle connection errors
    console.log('Error connecting to MongoDB:', error);
  });
