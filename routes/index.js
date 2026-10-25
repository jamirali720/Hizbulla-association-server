import { Router } from "express";
import userRouter from "../routers/user.router.js";
import committeRouter from "../routers/committee.router.js";
import upazilaRouter from "../routers/upazila.router.js";
import unionRouter from "../routers/union.router.js";
import wardRouter from "../routers/ward.router.js";



const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRouter,
  },
  {
    path: "/committee",
    route: committeRouter,
  },
  {
    path: "/upazila",
    route: upazilaRouter,
  },
  {
    path: "/union",
    route: unionRouter,
  },
  {
    path: "/ward",
    route: wardRouter,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
