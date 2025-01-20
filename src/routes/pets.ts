import { Router } from "express";
import PetController from "controller/PetController";

const petsRoutes = Router();
const petController = new PetController();

petsRoutes.post("/register/:id", petController.register);

export default petsRoutes;