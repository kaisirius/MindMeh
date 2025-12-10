import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { Express } from "express"

import mainRouter from "./routes/main"

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(mainRouter);

const main = async () => {
  if(!process.env.MONGODB_URL) {
    throw new Error("Missing DB URL in environment variables.");
  }
  if(!process.env.JWT_SECRET) {
    throw new Error("Missing JWT SECRET KEY in environment variables.");
  }
  if(!process.env.PORT) {
    throw new Error("Missing PORT in environment variables.");
  }
  if(!process.env.VOYAGE_API_KEY) {
    throw new Error("Missing Voyage AI API Key.");
  }
  await mongoose.connect(process.env.MONGODB_URL);
  
  app.listen(Number(process.env.PORT), () => console.log(`MindMeh backend running on port ${Number(process.env.PORT)}`));
}

main()