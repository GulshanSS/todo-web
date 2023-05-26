import express, { Router } from "express";
import {
  deleteUserByIdHandler,
  getUserByEmailHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from "../controller/user.controller";

const UserRouter: Router = express.Router();

UserRouter.get("/", getUserByIdHandler);
UserRouter.get("/by-email", getUserByEmailHandler);
UserRouter.put("/update", updateUserByIdHandler);
UserRouter.delete("/delete", deleteUserByIdHandler);

export default UserRouter;
