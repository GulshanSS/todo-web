import express, { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  registerHandler,
} from "../controller/auth.controller";

const AuthRouter: Router = express.Router();

AuthRouter.post("/register", registerHandler);
AuthRouter.post("/login", loginHandler);
AuthRouter.get("/refreh-token", refreshTokenHandler);
AuthRouter.delete("/logout", logoutHandler);

export default AuthRouter;
