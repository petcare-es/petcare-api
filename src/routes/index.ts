import { Router } from "express";

import usersRoutes from "./users";
import petsRoutes from "./pets";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/pets", petsRoutes);

export default routes;