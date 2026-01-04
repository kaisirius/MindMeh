import { Request, Response, Router } from "express"
import auth from "../middleware/auth"
import { brainModel, contentModel } from "../db/db";
import mongoose from "mongoose";

const viewOnlyRouter = Router();

viewOnlyRouter.get("/brain/:hash", auth, async (req: Request, res:Response) => {
  const hash = req.params.hash;
    try{
      const currentBrainId = await brainModel.findOne({
        hash,
        share: true
      })
      if(currentBrainId) {
        const listOfContents = await contentModel.find({
          brainId: currentBrainId._id
        })
        res.status(200).json({
          listOfContents
        })
      } else {
        res.status(400).json({
          message: "No such brain exists."
        })
      }
    } catch(e) {
      res.status(500).json({
        message: "Internal server error.",
        error: e
      })
    }
});

export default viewOnlyRouter