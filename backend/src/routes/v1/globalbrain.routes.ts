import { Request, Response, Router } from "express"
import { brainModel } from "../../db/db";
import auth from "../../middleware/auth";
import { getEmbedding } from "../../utils/getVectorEmbeddings";

const globalBrainRouter = Router();

globalBrainRouter.get("/globalbrains", auth, async (req: Request, res: Response) => {
  let search = req.query.search as string;
  if(search == undefined || search === "") {
    return res.status(200).json({
      listOfBrains: [{}]
    });
  }
  
  const embedding = await getEmbedding(search);
  try {
    const pipeline = [ 
      { 
        $vectorSearch: { 
          index: 'vector_index', 
          path: 'embedding', 
          queryVector: embedding, 
          numCandidates: 150, 
          limit: 10
        } 
      },
      {
        $match: {
          share: true
        }
      }, 
      { 
        $project: {
           _id: 0, 
           title: 1, 
           hash: 1,
           userId: 1,
           imageId: 1,
           score: {
             $meta: 'vectorSearchScore' 
            } 
          } 
      } 
    ];
    const listOfBrains = await brainModel.aggregate(pipeline);
    res.status(200).json({
      listOfBrains
    })
  } catch(e) {
    res.status(500).json({
      message: "Internal server error.",
      error: e
    })
  }

});

export default globalBrainRouter;