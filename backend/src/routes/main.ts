import { Router } from "express"
import authRouter from "./auth.routes";
import homeRouter from "./home.routes";
import viewBrainRouter from "./viewOnly.route";
import v1mainRouter from "./v1/v1main";
import mindmapRouter from "./mindmap";

const mainRouter = Router();

mainRouter.use(authRouter, v1mainRouter, mindmapRouter)
mainRouter.use("/home", homeRouter)
mainRouter.use("/view", viewBrainRouter)

export default mainRouter;