import mongoose, { mongo } from "mongoose"
import userSchema from "./schemas/user"
import contentSchema from "./schemas/content";
import brainSchema from "./schemas/brain";
import imageSchema from "./schemas/image";
import mindmapSchema from "./schemas/mindmap";

export const userModel = mongoose.model('users', userSchema);
export const contentModel = mongoose.model('contents', contentSchema);
export const brainModel = mongoose.model('brains', brainSchema);
export const imageModel = mongoose.model('images', imageSchema);
export const mindmapModel = mongoose.model('mindmap', mindmapSchema)



