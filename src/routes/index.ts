import { Router } from "express";

import usersRoutes from "./users";

const routes = Router();

routes.use("/users", usersRoutes);

export default routes;