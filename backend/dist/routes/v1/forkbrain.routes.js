"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../../db/db");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const uuid_1 = __importDefault(require("uuid"));
const forkBrainRouter = (0, express_1.Router)();
forkBrainRouter.post("/fork/brain/:hash", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.hash;
    try {
        const currentBrain = yield db_1.brainModel.findOne({
            hash,
            share: true
        });
        if (currentBrain) {
            const listOfContents = yield db_1.contentModel.find({
                brainId: currentBrain._id
            });
            const title = currentBrain.title;
            const hash = title + "-" + uuid_1.default.v4(); // unique uuid
            const share = false;
            const imageId = currentBrain.imageId;
            const userId = new mongoose_1.default.Types.ObjectId(req.userId);
            const embedding = currentBrain.embedding;
            const newBrainForUser = yield db_1.brainModel.create({
                title,
                share,
                hash,
                userId,
                imageId,
                embedding
            });
            if (newBrainForUser) {
                yield db_1.contentModel.insertMany(listOfContents.map(item => ({
                    link: item.link,
                    title: item.title,
                    description: item.description,
                    typeOfContent: item.typeOfContent,
                    createdAt: new Date().toISOString(),
                    brainId: newBrainForUser._id
                })));
                res.status(200).json({
                    message: "Brain forked successfully.",
                    hash
                });
            }
            else {
                res.status(500).json({
                    message: "Internal server error. Couldn't fork brain."
                });
            }
        }
        else {
            res.status(400).json({
                message: "No such brain exists."
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error. Couldn't fork brain",
            error: e
        });
    }
}));
exports.default = forkBrainRouter;
