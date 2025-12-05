import { Router } from "express"
import authRouter from "./auth.routes";
import homeRouter from "./home.routes";
import viewBrainRouter from "./viewOnly.route";
import v1mainRouter from "./v1/v1main";

const mainRouter = Router();

mainRouter.use(authRouter)
mainRouter.use(v1mainRouter)
mainRouter.use("/home", homeRouter)
mainRouter.use("/view", viewBrainRouter)

export default mainRouter;