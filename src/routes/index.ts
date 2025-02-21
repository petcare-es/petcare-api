import { Router } from "express";

import usersRoutes from "./users";
import petsRoutes from "./pets";
import vaccinesRoutes from "./vaccines";
import appointmentsRoutes from "./appointments";
import moodsRoutes from "./moods";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/pets", petsRoutes);
routes.use("/vaccines", vaccinesRoutes);
routes.use("/appointments", appointmentsRoutes);
routes.use("/moods", moodsRoutes);

export default routes;