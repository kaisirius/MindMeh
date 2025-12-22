import { Request, Response, Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import auth from "../../middleware/auth";
import { imageModel } from "../../db/db";
import { cloneDef } from "zod/v4/core/util.cjs";
import { time } from "zod/v4/core/regexes.cjs";
import { overwrite } from "zod";


const imageRouter = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

imageRouter.get("/image/:id", auth, async (req: Request<{ id: string }>, res: Response) => {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  try {
    const img = await imageModel.findOne({
      _id
    })
    if(img) {
      res.status(200).json({
        message: "Image fetched successfully.",
        imageURL: img.imageURL
      });
    } else {
      res.status(404).json({
        message: "Image not found."
      });
    }
  } catch(e) {
    res.status(500).json({
      message: "Internal server error."
    })
  }
});

imageRouter.post("/image/getSignedURL", auth, async (req: Request, res: Response) => {
  const userId = req.userId; // act as public_id
  const timestamp = Math.round((new Date()).getTime()/1000);
  const params_to_sign = {
    timestamp: timestamp,
    public_id: userId,
    asset_folder: "MindMeh",
    overwrite: true 
  };

  try {
  const signature = cloudinary.utils.api_sign_request(params_to_sign, process.env.CLOUDINARY_API_SECRET as string);
  
  res.status(200).json({
    timestamp,
    signature,
    public_id: userId,
    api_key: cloudinary.config().api_key // public info that's why sending via network call. 
  })

  } catch(e) {
    res.status(500).json({
      message: "Internal server error. Can't create signature to upload image.",
      error: e
    })
  }
});  

imageRouter.post("/image/uploadURL", auth, async (req: Request<{}, {}, {imageURL: string}>, res: Response) => {
  const imageURL = req.body.imageURL;
  try {
    const img = await imageModel.create({
      imageURL
    });

    res.status(200).json({
      id: img._id.toString()
    });

  } catch(e) {
    res.status(500).json({
      message: "Internal DB error. ",
      error: e
    })
  }
})

export default imageRouter