import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import auth from "../../middleware/auth";
import { imageModel } from "../../db/db";


const imageRouter = Router();

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
})

export default imageRouter