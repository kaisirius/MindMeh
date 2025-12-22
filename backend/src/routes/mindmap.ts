import { Request, Response, Router } from "express";
import auth from "../middleware/auth";
import { brainModel, contentModel } from "../db/db";
import { getMindMap } from "../utils/getMindMap";

const mindmapRouter = Router();

mindmapRouter.get("/brain/mindmap/:hash", auth, async (req: Request, res: Response) => {
  const hash = req.params.hash;
  try {
    const currentBrain = await brainModel.findOne({ hash });
    if(currentBrain) {
      const _id = currentBrain._id;
      const listOfContents = await contentModel.find({ _id });
      const contentMetadata = listOfContents.map(content => {
        return {
          title: content.title as string,
          description: content.description as string,
          link: content.link as string
        }
      });

      const mindmap = await getMindMap(contentMetadata);
      if(mindmap != undefined) {
        res.status(200).json({
        mindmap
        });
      } else {
        res.status(500).json({
          message: "Internal AI API error. Can't generate correct mindmap."
        });
      }
    } else {
      res.status(404).json({
        message: "Brain not found."
      });
    }
  } catch(e) {
    res.status(500).json({
      message: "Internal AI API error. Can't generate correct mindmap.",
      error: e
    });
  }
})

export default mindmapRouter