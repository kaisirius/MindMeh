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
const zod_1 = __importDefault(require("zod"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const db_1 = require("../../db/db");
const mongoose_1 = __importDefault(require("mongoose"));
const contentRouter = (0, express_1.Router)();
contentRouter.post("/content/:hash", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentSchema = zod_1.default.object({
        link: zod_1.default.url(),
        title: zod_1.default.string().nonempty(),
        description: zod_1.default.string(),
        typeOfContent: zod_1.default.enum(["Youtube", "Twitter", "Medium", "Reddit"])
    });
    const checkInput = contentSchema.safeParse(req.body);
    const userId = new mongoose_1.default.Types.ObjectId(req.userId);
    if (checkInput.success) {
        try {
            const currentBrain = yield db_1.brainModel.findOne({
                hash: req.params.hash,
                userId
            });
            if (currentBrain) {
                const contentCreatedObject = yield db_1.contentModel.create({
                    link: req.body.link,
                    title: req.body.title,
                    description: req.body.description,
                    typeOfContent: req.body.typeOfContent,
                    createdAt: new Date().toISOString(),
                    brainId: currentBrain._id
                });
                res.status(200).json({
                    message: "Content successfully added to corresponding brain.",
                    id: contentCreatedObject._id.toString()
                });
            }
            else {
                res.status(404).json({
                    message: "Brain not found."
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Internal server error."
            });
        }
    }
    else {
        res.status(400).json({
            message: "Invalid input format to post content."
        });
    }
}));
contentRouter.delete("/content/:hash/:contentId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.default.Types.ObjectId(req.userId);
    const hash = req.params.hash;
    const _id = new mongoose_1.default.Types.ObjectId(req.params.contentId);
    try {
        const currentBrain = yield db_1.brainModel.findOne({
            hash,
            userId
        });
        if (currentBrain) {
            yield db_1.contentModel.deleteOne({
                _id,
                brainId: currentBrain._id
            });
            res.status(201).json({
                message: "Content deleted from brain."
            });
        }
        else {
            res.status(404).json({
                message: "Brain not found."
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
}));
exports.default = contentRouter;
