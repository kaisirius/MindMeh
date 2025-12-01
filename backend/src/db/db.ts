import mongoose, { mongo } from "mongoose"
import userSchema from "./schemas/user"
import contentSchema from "./schemas/content";
import brainSchema from "./schemas/brain";
import imageSchema from "./schemas/image";

export const userModel = mongoose.model('Users', userSchema);
export const contentModel = mongoose.model('Contents', contentSchema);
export const brainModel = mongoose.model('Brains', brainSchema);
export const imageModel = mongoose.model('Images', imageSchema);



