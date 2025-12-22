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
const auth_1 = __importDefault(require("../middleware/auth"));
const db_1 = require("../db/db");
const getMindMap_1 = require("../utils/getMindMap");
const mindmapRouter = (0, express_1.Router)();
mindmapRouter.get("/brain/mindmap/:hash", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.hash;
    try {
        const currentBrain = yield db_1.brainModel.findOne({ hash });
        if (currentBrain) {
            const _id = currentBrain._id;
            const listOfContents = yield db_1.contentModel.find({ _id });
            const contentMetadata = listOfContents.map(content => {
                return {
                    title: content.title,
                    description: content.description,
                    link: content.link
                };
            });
            const mindmap = yield (0, getMindMap_1.getMindMap)(contentMetadata);
            if (mindmap != undefined) {
                res.status(200).json({
                    mindmap
                });
            }
            else {
                res.status(500).json({
                    message: "Internal AI API error. Can't generate correct mindmap."
                });
            }
        }
        else {
            res.status(404).json({
                message: "Brain not found."
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal AI API error. Can't generate correct mindmap.",
            error: e
        });
    }
}));
exports.default = mindmapRouter;
