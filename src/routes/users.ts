import { Router } from "express";
import UserController from "controller/UserController";

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post("/auth", userController.auth);

export default usersRoutes;