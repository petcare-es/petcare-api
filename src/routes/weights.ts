import { Router } from "express";
import ensureAuthentication from "middleware/ensureAuthentication";
import WeightDiaryController from "controller/WeightDiaryController";

const weightsRoutes = Router();
const weightDiaryController = new WeightDiaryController();

weightsRoutes.use(ensureAuthentication);

weightsRoutes.get("/pet/:id", weightDiaryController.findByOwner);
weightsRoutes.post("/register/:id", weightDiaryController.register);

export default weightsRoutes;