import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import zod, { ZodSafeParseResult } from "zod"
import auth from "../../middleware/auth";
import { brainModel } from "../../db/db";
import T_postBrainReq from "../../types/T_postBrainReq";

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
    const imageId = new mongoose.Schema.Types.ObjectId(req.body.imageId);
    const hash=""; // need to be implemented
    const userId = new mongoose.Schema.Types.ObjectId(req.userId as string);

    try {
      await brainModel.create({
        title,
        share,
        hash,
        userId,
        imageId
      })
      res.status(200).json({
        hash
      });
    } catch(e) {
      res.status(500).json({
        message: "Internal server error."
      });
    } 
  } else {
    res.status(400).json({
      message: "Invalid request body parameters."
    })
  }
  
});

export default brainRouter
