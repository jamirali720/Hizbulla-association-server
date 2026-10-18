const express = require('express');
const app = express();


const dotenv = require('dotenv');
dotenv.config();

const {errorHandler} = require('./utils/errors');


// Middleware to parse JSON bodies (optional but useful)
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.use(errorHandler);
module.exports = app;