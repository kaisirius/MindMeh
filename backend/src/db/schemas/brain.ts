import mongoose, { Schema } from "mongoose"

const brainSchema = new Schema({
  title: String,
  share: Boolean,
  hash: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'images'
  },
  embedding: [Number]
})

export default brainSchema