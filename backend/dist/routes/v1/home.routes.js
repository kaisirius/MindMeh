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
const auth_1 = __importDefault(require("../../middleware/auth"));
const db_1 = require("../../db/db");
const homeRouter = (0, express_1.Router)();
homeRouter.get("/brains", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOfBrains = yield db_1.brainModel.find({
            userId: req.userId
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
homeRouter.get("/brains/:hash", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.hash;
    try {
        const currentBrainId = yield db_1.brainModel.findOne({
            hash
        });
        const listOfContents = yield db_1.contentModel.find({
            brainId: currentBrainId
        });
        res.status(200).json({
            listOfContents
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error.",
            error: e
        });
    }
}));
exports.default = homeRouter;
