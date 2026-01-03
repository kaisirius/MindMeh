import { Request, Response, Router } from "express";
import zod, { ZodSafeParseResult } from "zod";
import auth from "../../middleware/auth";
import { brainModel, contentModel } from "../../db/db";
import mongoose from "mongoose";
import { getEmbedding } from "../../utils/getVectorEmbeddings";

const contentRouter = Router();

contentRouter.post("/content/:hash", auth,  async (req: Request<{hash: string}, {}, T_postContent>, res: Response) => {
  const contentSchema = zod.object({
    link: zod.url(),
    title: zod.string().nonempty(), 
    description: zod.string(),
    typeOfContent: zod.enum(["Youtube", "Medium", "Twitter", "Reddit", "Other"])
  });
  
  type contentSchemaType = zod.infer<typeof contentSchema>;
  const checkInput: ZodSafeParseResult<contentSchemaType> = contentSchema.safeParse(req.body);
  const userId = req.userId;

  if(checkInput.success) {
    try {
      const currentBrain = await brainModel.findOne({
        hash: req.params.hash,
        userId
      });
      if(currentBrain) {
        const embedding = [1];
        
        const contentCreatedObject = await contentModel.create({
          link: req.body.link,
          title: req.body.title,
          description: req.body.description,
          typeOfContent: req.body.typeOfContent,
          createdAt: new Date().toISOString(),
          brainId: currentBrain._id,
          embedding
        })
        
        res.status(200).json({
          message: "Content successfully added to corresponding brain.",
          id: contentCreatedObject._id.toString()
        })
      } else {
        res.status(404).json({
          message: "Brain not found."
        })
      }
    } catch(e) {
      res.status(500).json({
        message: "Internal server error.",
        error: e
      })
    }
  } else {
    res.status(400).json({
      message: "Invalid input format to post content."
    })
  }
});

contentRouter.delete("/content/:hash/:contentId", auth, async (req: Request<{hash: string, contentId: string}>, res: Response) => {
  const userId = req.userId;
  const hash = req.params.hash;
  const _id = req.params.contentId;
  
  try {
    const currentBrain = await brainModel.findOne({
      hash,
      userId
    });
    if(currentBrain) {
      await contentModel.deleteOne({
        _id,
        brainId: currentBrain._id
      })
      
      res.status(201).json({
        message: "Content deleted from brain."
      })
    } else {
      res.status(404).json({
        message: "Brain not found."
      })
    }
  } catch(e) {
    res.status(500).json({
      message: "Internal server error."
    })
  }
});

export default contentRouter