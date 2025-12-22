import { Schema } from "mongoose"

const imageSchema = new Schema({
  imageURL: String // Cloudinary store URL
});

export default imageSchema;