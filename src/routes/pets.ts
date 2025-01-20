import { Router } from "express";
import PetController from "controller/PetController";
import ensureAuthentication from "middleware/ensureAuthentication";

const petsRoutes = Router();
const petController = new PetController();

petsRoutes.use(ensureAuthentication);

petsRoutes.post("/register/:id", petController.register);

export default petsRoutes;