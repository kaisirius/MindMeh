import { Request, Response, Router } from "express"
import auth from "../../middleware/auth";
import { brainModel, contentModel } from "../../db/db";
const homeRouter = Router();

homeRouter.get("/brains", auth, async (req: Request, res: Response) => {
  try{
    const listOfBrains = await brainModel.find({
      userId: req.userId
    })
    res.status(200).json({
      listOfBrains
    })
  } catch(e) {
    res.status(500).json({
      message: "Internal server error.",
      error: e
    })
  }
});


homeRouter.get("/brains/:hash", auth, async (req: Request, res: Response) => {
  const hash = req.params.hash;
  try{
    const currentBrainId = await brainModel.findOne({
      hash
    })
    const listOfContents = await contentModel.find({
      brainId: currentBrainId
    })
    res.status(200).json({
      listOfContents
    })
  } catch(e) {
    res.status(500).json({
      message: "Internal server error.",
      error: e
    })
  }
});

export default homeRouter;