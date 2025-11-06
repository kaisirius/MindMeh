import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { Express, Request, Response } from "express"

dotenv.config();

const app: Express = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello"
  })
})

const main = async () => {
  await mongoose.connect(process.env.DB_URL as string);
  app.listen(process.env.PORT || 3000, () => console.log(`MindMesh backend running on port ${process.env.PORT || 3000}`));
}

main()