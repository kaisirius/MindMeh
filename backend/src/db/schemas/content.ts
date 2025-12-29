import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema({
  link: String,
  title: String,
  description: String,
  typeOfContent: {
    type: String,
    enum: ['Youtube', 'Twitter', 'Reddit', 'Medium', 'Other'],
    default: 'Other'
  },
  createdAt: {
    type: String,
    default: new Date().toISOString()  
  },
  brainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brains'
  },
  embedding: [Number]
});

export default contentSchema