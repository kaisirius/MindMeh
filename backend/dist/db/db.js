"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageModel = exports.brainModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./schemas/user"));
const content_1 = __importDefault(require("./schemas/content"));
const brain_1 = __importDefault(require("./schemas/brain"));
const image_1 = __importDefault(require("./schemas/image"));
exports.userModel = mongoose_1.default.model('Users', user_1.default);
exports.contentModel = mongoose_1.default.model('Contents', content_1.default);
exports.brainModel = mongoose_1.default.model('Brains', brain_1.default);
exports.imageModel = mongoose_1.default.model('Images', image_1.default);
