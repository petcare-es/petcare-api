import { Router } from "express";

import usersRoutes from "./users";
import petsRoutes from "./pets";
import vaccinesRoutes from "./vaccines";
import appointmentsRoutes from "./appointments";
import moodsRoutes from "./moods";
import foodsRoutes from "./foods";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/pets", petsRoutes);
routes.use("/vaccines", vaccinesRoutes);
routes.use("/appointments", appointmentsRoutes);
routes.use("/moods", moodsRoutes);
routes.use("/foods", foodsRoutes);

export default routes;