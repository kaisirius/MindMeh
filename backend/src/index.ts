import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import zod from "zod"
import { Express, Request, Response } from "express"

dotenv.config();

const app: Express = express();
app.use(cors());

app.post("/signup", (req: Request, res: Response) => {
  // zod validation and zod inference 
  // make db query
})

app.post("/signin", (req: Request, res: Response) => {
  // not necessary zod validation but security reasons before hitting db it's better
  // check in db
  // sign and return jwt
})


const main = async () => {
  await mongoose.connect(process.env.DB_URL as string);
  app.listen(process.env.PORT || 3000, () => console.log(`MindMesh backend running on port ${process.env.PORT || 3000}`));
}

main()