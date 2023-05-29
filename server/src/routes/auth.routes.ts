import express, { Router } from "express";
import {
  deleteRefreshTokenByUserIdHandler,
  loginHandler,
  refreshTokenHandler,
  registerHandler,
} from "../controller/auth.controller";

const AuthRouter: Router = express.Router();

AuthRouter.post("/register", registerHandler);
AuthRouter.post("/login", loginHandler);
AuthRouter.get("/refreh-token", refreshTokenHandler);
AuthRouter.delete("/logout", deleteRefreshTokenByUserIdHandler);

export default AuthRouter;
