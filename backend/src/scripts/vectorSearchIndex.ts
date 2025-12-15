import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const client = new MongoClient(process.env.MONGODB_URL as string);

async function run() {
   try {
     const database = client.db("MindMeh");
     const collection = database.collection("brains");
    
     const index = {
         name: "vector_index",
         type: "vectorSearch",
         definition: {
           "fields": [
             {
               "type": "vector",
               "path": "embedding",
               "similarity": "dotProduct",
               "numDimensions": 1024
             }
           ]
         }
     }
     const result = await collection.createSearchIndex(index);
     console.log("Vector search Index setup done. " + result);
   } finally {
     await client.close();
   }
}
run().catch(console.dir);