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
const auth_1 = __importDefault(require("../../middleware/auth"));
const getVectorEmbeddings_1 = require("../../utils/getVectorEmbeddings");
const globalBrainRouter = (0, express_1.Router)();
globalBrainRouter.get("/globalbrains", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let search = req.query.search;
    if (search == undefined)
        search = "";
    const embedding = yield (0, getVectorEmbeddings_1.getEmbedding)(search);
    try {
        const pipeline = [
            {
                $vectorSearch: {
                    index: 'vector_index',
                    path: 'embedding',
                    queryVector: embedding,
                    numCandidates: 150,
                    limit: 10
                }
            },
            {
                $match: {
                    share: true
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    hash: 1,
                    userId: 1,
                    //  imageId: 1,
                    score: {
                        $meta: 'vectorSearchScore'
                    }
                }
            }
        ];
        const listOfBrains = yield db_1.brainModel.aggregate(pipeline);
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
exports.default = globalBrainRouter;
