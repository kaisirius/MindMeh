import { Request, Response, Router } from "express"
import { brainModel, contentModel } from "../../db/db";
import mongoose from "mongoose";
import auth from "../../middleware/auth";
import uuid from "uuid"

const forkBrainRouter = Router();

forkBrainRouter.post("/fork/brain/:hash", auth, async (req: Request, res:Response) => {
  const hash = req.params.hash;
    try{
      const currentBrain = await brainModel.findOne({
        hash,
        share: true
      })
      if(currentBrain) {
        const listOfContents = await contentModel.find({
          brainId: currentBrain._id
        })
        const title = currentBrain.title;
        const hash = title + "-" + uuid.v4(); // unique uuid
        const share = false;
        const imageId = currentBrain.imageId;
        const userId = new mongoose.Types.ObjectId(req.userId);
        const embedding = currentBrain.embedding;

        const newBrainForUser = await brainModel.create({
          title,
          share,
          hash,
          userId,
          imageId,
          embedding
        })

        if(newBrainForUser) {
          await contentModel.insertMany(
            listOfContents.map(item => ({
              link: item.link,
              title: item.title,
              description: item.description,
              typeOfContent: item.typeOfContent,
              createdAt: new Date().toISOString(),
              brainId: newBrainForUser._id,
              embedding: item.embedding
            }))
          );
          res.status(200).json({
            message: "Brain forked successfully.",
            hash
          })
        } else {
          res.status(500).json({
            message: "Internal server error. Couldn't fork brain."
          })
        }

      } else {
        res.status(400).json({
          message: "No such brain exists."
        })
      }
    } catch(e) {
      res.status(500).json({
        message: "Internal server error. Couldn't fork brain",
        error: e
      })
    }
});

export default forkBrainRouter