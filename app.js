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
app.use(
  cors({
    origin: "http://localhost:5173",
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