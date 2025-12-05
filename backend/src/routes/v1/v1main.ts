import { Router } from "express"
import brainRouter from "./brain.routes";

const v1mainRouter = Router();

v1mainRouter.use("/api/v1", brainRouter)

export default v1mainRouter;