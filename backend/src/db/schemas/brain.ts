import mongoose, { Schema } from "mongoose"

const brainSchema = new Schema({
  title: String,
  share: Boolean,
  hash: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  imageURL: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Images'
  }
})

export default brainSchema