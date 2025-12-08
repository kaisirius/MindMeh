import { Router } from "express"
import brainRouter from "./brain.routes";
import contentRouter from "./content.routes";

const v1mainRouter = Router();

v1mainRouter.use("/api/v1", brainRouter)
v1mainRouter.use("/api/v1", contentRouter)

export default v1mainRouter;