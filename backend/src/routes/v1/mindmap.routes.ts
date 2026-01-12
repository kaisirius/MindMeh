import { Request, Response, Router } from "express";
import auth from "../../middleware/auth";
import { getMindMap } from "../../utils/getMindMap";
import T_mindMapReq from "../../types/T_mindMapReq";
import { mindmapModel } from "../../db/db";

const mindmapRouter = Router();

mindmapRouter.post("/brain/mindmap/:hash", auth, async (req: Request<{ hash: string }, {}, T_mindMapReq>, res: Response) => {
  const hash = req.params.hash;
  try {
    const { listOfContents } = req.body; 
    const CurrentMindMap = await mindmapModel.findOne({ hash });
    if(CurrentMindMap) {
      if(!CurrentMindMap.isChanged) {
        return res.status(200).json({
          mindmap: JSON.parse(CurrentMindMap.mindmap as string)
        })
      } else {
        const mindmap = await getMindMap(listOfContents);
        if(mindmap != undefined) {
          await mindmapModel.updateOne({ 
            hash
          }, {
            mindmap: JSON.stringify(mindmap),
            isChanged: false
          });
          res.status(200).json({
          mindmap
          });
        } else {
          res.status(500).json({
            message: "Internal AI API error. Can't generate correct mindmap."
          });
        }
      }
    } else {
      return res.status(404).json({
        message: "Brain not found."
      })
    }
  } catch(e) {
    res.status(500).json({
      message: "Unknown error",
      error: e
    });
  }
})

export default mindmapRouter