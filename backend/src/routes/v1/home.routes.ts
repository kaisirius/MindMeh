import { Request, Response, Router } from "express"
import auth from "../../middleware/auth";
import { brainModel, contentModel } from "../../db/db";
import mongoose from "mongoose";
const homeRouter = Router();

homeRouter.get("/brains", auth, async (req: Request, res: Response) => {
  try{
    const userId = new mongoose.Schema.Types.ObjectId(req.userId as string);
    const listOfBrains = await brainModel.find({
      userId
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
    if(currentBrainId) {
      const listOfContents = await contentModel.find({
        brainId: currentBrainId._id
      })
      res.status(200).json({
        listOfContents
      })
    }
  } catch(e) {
    res.status(500).json({
      message: "Internal server error.",
      error: e
    })
  }
});

export default homeRouter;