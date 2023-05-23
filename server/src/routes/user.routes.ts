import express, { Router } from "express";
import {
  deleteUserByIdHandler,
  getAllUsersHandler,
  getUserByEmailHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from "../controller/user.controller";

const UserRouter: Router = express.Router();

UserRouter.get("/", getAllUsersHandler);
UserRouter.get("/:userId", getUserByIdHandler);
UserRouter.get("/by-email", getUserByEmailHandler);
UserRouter.put("/:userId/update", updateUserByIdHandler);
UserRouter.delete("/:userId/delete", deleteUserByIdHandler);

export default UserRouter;
