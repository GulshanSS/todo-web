import express, { Router } from "express";
import { loginHandler, registerHandler } from "../controller/auth.controller";

const AuthRouter: Router = express.Router();

AuthRouter.post("/register", registerHandler);
AuthRouter.post("/login", loginHandler);

export default AuthRouter;
