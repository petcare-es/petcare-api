import { Router } from "express";
import VaccineController from "controller/VaccineController";
import ensureAuthentication from "middleware/ensureAuthentication";

const vaccinesRoutes = Router();
const vaccineController = new VaccineController();

vaccinesRoutes.use(ensureAuthentication);

vaccinesRoutes.get("/pet/:id", vaccineController.findByOwner);

export default vaccinesRoutes;