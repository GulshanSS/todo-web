import express, { Router } from "express";
import {
  loginHandler,
  refreshTokenHandler,
  registerHandler,
} from "../controller/auth.controller";

const AuthRouter: Router = express.Router();

AuthRouter.post("/register", registerHandler);
AuthRouter.post("/login", loginHandler);
AuthRouter.get("/refreh-token", refreshTokenHandler);

export default AuthRouter;
