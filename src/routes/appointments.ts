import { Router } from "express";
import AppointmentController from "controller/AppointmentController";
import ensureAuthentication from "middleware/ensureAuthentication";

const appointmentsRoutes = Router();
const appointmentController = new AppointmentController();

appointmentsRoutes.use(ensureAuthentication);

appointmentsRoutes.get("/pet/:id", appointmentController.findByOwner);
appointmentsRoutes.post("/register/:id", appointmentController.register);

export default appointmentsRoutes;