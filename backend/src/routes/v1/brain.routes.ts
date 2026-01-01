import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import zod, { ZodSafeParseResult } from "zod"
import uuid from "uuid"
import auth from "../../middleware/auth";
import { brainModel, contentModel } from "../../db/db";
import T_postBrainReq from "../../types/T_postBrainReq";
import { getEmbedding } from "../../utils/getVectorEmbeddings";

const brainRouter = Router();

brainRouter.post("/brain", auth, async (req: Request<{}, {}, T_postBrainReq>, res: Response) => {
  const reqBodySchema = zod.object({
    title: zod.string().nonempty(),
    share: zod.boolean(),
    imageId: zod.string().nonempty()
  });

  type reqBodySchemaType = zod.infer<typeof reqBodySchema>;
  const zodCheck: ZodSafeParseResult<reqBodySchemaType> = reqBodySchema.safeParse(req.body);

  if(zodCheck.success) {
    const title = req.body.title;
    const share = req.body.share;
    const imageId =req.body.imageId;
    const hash = title + "-" + uuid.v4(); // unique uuid
    const userId = req.userId;

    try {
      const embedding = await getEmbedding(title);
      await brainModel.create({
        title,
        share,
        hash,
        userId,
        imageId,
        embedding
      })
      res.status(200).json({
        hash
      });
    } catch(e) {
      res.status(500).json({
        message: "Internal server error." ,
        error: e
      });
    } 
  } else {
    res.status(400).json({
      message: "Invalid request body parameters."
    })
  }
  
});

brainRouter.delete("/brain/:hash", auth, async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  const hash = req.params.hash;
  try {
    const findBrain = await brainModel.findOne({
      userId,
      hash
    })
    if(findBrain){
      const brainId = findBrain._id;
      await contentModel.deleteMany({
        brainId
      })
      await brainModel.deleteOne({
        _id: brainId
      })
      res.status(200).json({
        message: "Brain & it's content deleted."
      })
    } else {
      res.status(400).json({
        message: "Unauthorized to delete this brain."
      })
    }
  } catch(e) {
    res.status(500).json({
      message: "Internal server error.",
      error: e
    })
  }
});


brainRouter.put("/brain/:hash", auth, async (req: Request<{hash: string}, {}, {share: boolean}>, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  const hash = req.params.hash;
  const share = req.body.share;
  try {
    const findBrain = await brainModel.findOne({
      userId,
      hash
    })
    if(findBrain){
      const brainId = findBrain._id;
      await brainModel.updateOne({
        _id: brainId
      }, {
        share
      })
      res.status(200).json({
        message: "Visibility of brain updated."
      })
    } else {
      res.status(400).json({
        message: "Unauthorized to update visibility of this brain."
      })
    }
  } catch(e) {
    res.status(500).json({
      message: "Internal server error."
    })
  }
});


brainRouter.get("/publicBrains", auth, async (req: Request, res: Response) => {
  try{
    const userId = new mongoose.Types.ObjectId(req.userId);
    const listOfBrains = await brainModel.find({
      userId,
      share: true
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
})

brainRouter.get("/privateBrains", auth, async (req: Request, res: Response) => {
  try{
    const userId = new mongoose.Types.ObjectId(req.userId);
    const listOfBrains = await brainModel.find({
      userId,
      share: false
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
})

export default brainRouter
