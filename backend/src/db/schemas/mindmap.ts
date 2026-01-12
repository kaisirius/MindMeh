import mongoose, { Schema } from "mongoose"

const mindmapSchema = new Schema({
  hash: String,
  mindmap: String, // JSON format
  isChanged: Boolean
})

export default mindmapSchema