import express from 'express';
const app = express();

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import {errorHandler} from './utils/errors.js';
import router from './routes/index.js';




// Middleware to parse JSON bodies (optional but useful)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(
//   cors({

//     origin: "https://bangladesh-jomyate-hizbullah.web.app",
//     credentials: true,
//   }),
// );

const allowedOrigins = [
  "http://localhost:5173",
  "https://bangladesh-jomyate-hizbullah.web.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);
app.use("/api", router)

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);
export default app;