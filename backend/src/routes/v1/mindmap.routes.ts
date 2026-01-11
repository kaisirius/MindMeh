import { Request, Response, Router } from "express";
import auth from "../../middleware/auth";
import { getMindMap } from "../../utils/getMindMap";
import T_mindMapReq from "../../types/T_mindMapReq";

const mindmapRouter = Router();

mindmapRouter.post("/brain/mindmap", auth, async (req: Request<{}, {}, T_mindMapReq>, res: Response) => {
  try {
    const { listOfContents } = req.body; 
    const mindmap = await getMindMap(listOfContents);
    if(mindmap != undefined) {
      res.status(200).json({
      mindmap
      });
    } else {
      res.status(500).json({
        message: "Internal AI API error. Can't generate correct mindmap."
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