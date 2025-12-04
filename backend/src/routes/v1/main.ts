import { Router } from "express"
import authRouter from "./auth.routes";
import homeRouter from "./home.routes";
import viewBrainRouter from "./viewOnly.route";

const mainRouter = Router();

mainRouter.use(authRouter)
mainRouter.use("/home", homeRouter)
mainRouter.use("/view", viewBrainRouter)

export default mainRouter;