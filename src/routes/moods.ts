import { Router } from "express";
import ensureAuthentication from "middleware/ensureAuthentication";
import MoodDiaryController from "controller/MoodDiaryController";

const moodsRoutes = Router();
const moodDiaryController = new MoodDiaryController();

moodsRoutes.use(ensureAuthentication);

moodsRoutes.get("/pet/:id", moodDiaryController.findByOwner);
moodsRoutes.post("/register/:id", moodDiaryController.register);

export default moodsRoutes;