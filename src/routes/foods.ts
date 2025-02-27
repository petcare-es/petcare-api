import { Router } from "express";
import ensureAuthentication from "middleware/ensureAuthentication";
import FoodDiaryController from "controller/FoodDiaryController";

const foodsRoutes = Router();
const foodDiaryController = new FoodDiaryController();

foodsRoutes.use(ensureAuthentication);

foodsRoutes.get("/pet/:id", foodDiaryController.findByOwner);
foodsRoutes.post("/register/:id", foodDiaryController.register);

export default foodsRoutes;