import { Router } from "express"
import brainRouter from "./brain.routes";
import contentRouter from "./content.routes";
import imageRouter from "./image.routes";
import forkBrainRouter from "./forkbrain.routes";
import globalBrainRouter from "./globalbrain.routes";
import mindmapRouter from "./mindmap.routes";

const v1mainRouter = Router();

v1mainRouter.use("/api/v1", brainRouter, contentRouter, imageRouter, forkBrainRouter, globalBrainRouter, mindmapRouter)

export default v1mainRouter;