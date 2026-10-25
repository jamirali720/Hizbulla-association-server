import express from 'express';
const app = express();

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import {errorHandler} from './utils/errors.js';
import router from './routes/index.js';
import upazilaRouter from './routers/upazila.router.js';
import unionRouter from './routers/union.router.js';
import wardRouter from './routers/ward.router.js';



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
app.use("/api/upazilas", upazilaRouter);
app.use("/api/unions", unionRouter);
app.use("/api/wards", wardRouter);
// Basic route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);
export default app;