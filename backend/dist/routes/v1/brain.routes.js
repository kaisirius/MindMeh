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
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const uuid_1 = __importDefault(require("uuid"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const db_1 = require("../../db/db");
const getVectorEmbeddings_1 = require("../../utils/getVectorEmbeddings");
const brainRouter = (0, express_1.Router)();
brainRouter.post("/brain", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBodySchema = zod_1.default.object({
        title: zod_1.default.string().nonempty(),
        share: zod_1.default.boolean(),
        imageId: zod_1.default.string().nonempty()
    });
    const zodCheck = reqBodySchema.safeParse(req.body);
    if (zodCheck.success) {
        const title = req.body.title;
        const share = req.body.share;
        // const imageId = new mongoose.Schema.Types.ObjectId(req.body.imageId);
        const hash = title + "-" + uuid_1.default.v4(); // unique uuid
        const userId = new mongoose_1.default.Types.ObjectId(req.userId);
        try {
            const embedding = yield (0, getVectorEmbeddings_1.getEmbedding)(title);
            yield db_1.brainModel.create({
                title,
                share,
                hash,
                userId,
                // imageId,
                embedding
            });
            res.status(200).json({
                hash
            });
        }
        catch (e) {
            res.status(500).json({
                message: "Internal server error.",
                error: e
            });
        }
    }
    else {
        res.status(400).json({
            message: "Invalid request body parameters."
        });
    }
}));
brainRouter.delete("/brain/:hash", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.default.Types.ObjectId(req.userId);
    const hash = req.params.hash;
    try {
        const findBrain = yield db_1.brainModel.findOne({
            userId,
            hash
        });
        if (findBrain) {
            const brainId = findBrain._id;
            yield db_1.contentModel.deleteMany({
                brainId
            });
            yield db_1.brainModel.deleteOne({
                _id: brainId
            });
            res.status(200).json({
                message: "Brain & it's content deleted."
            });
        }
        else {
            res.status(400).json({
                message: "Unauthorized to delete this brain."
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
}));
brainRouter.put("/brain/:hash", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.default.Types.ObjectId(req.userId);
    const hash = req.params.hash;
    const share = req.body.share;
    try {
        const findBrain = yield db_1.brainModel.findOne({
            userId,
            hash
        });
        if (findBrain) {
            const brainId = findBrain._id;
            yield db_1.brainModel.updateOne({
                _id: brainId
            }, {
                share
            });
            res.status(200).json({
                message: "Visibility of brain updated."
            });
        }
        else {
            res.status(400).json({
                message: "Unauthorized to update visibility of this brain."
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
}));
brainRouter.get("/publicBrains", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(req.userId);
        const listOfBrains = yield db_1.brainModel.find({
            userId,
            share: true
        });
        res.status(200).json({
            listOfBrains
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error.",
            error: e
        });
    }
}));
brainRouter.get("/privateBrains", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(req.userId);
        const listOfBrains = yield db_1.brainModel.find({
            userId,
            share: false
        });
        res.status(200).json({
            listOfBrains
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error.",
            error: e
        });
    }
}));
exports.default = brainRouter;
