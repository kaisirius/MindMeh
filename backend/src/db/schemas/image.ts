import { Schema } from "mongoose"

const imageSchema = new Schema({
  imageURL: String // GCS Object URL
});

export default imageSchema;