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
const auth_1 = __importDefault(require("../../middleware/auth"));
const db_1 = require("../../db/db");
const imageRouter = (0, express_1.Router)();
imageRouter.get("/image/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = new mongoose_1.default.Types.ObjectId(req.params.id);
    try {
        const img = yield db_1.imageModel.findOne({
            _id
        });
        if (img) {
            res.status(200).json({
                message: "Image fetched successfully.",
                imageURL: img.imageURL
            });
        }
        else {
            res.status(404).json({
                message: "Image not found."
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
}));
exports.default = imageRouter;
