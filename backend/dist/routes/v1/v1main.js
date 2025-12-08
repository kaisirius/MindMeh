"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brain_routes_1 = __importDefault(require("./brain.routes"));
const content_routes_1 = __importDefault(require("./content.routes"));
const v1mainRouter = (0, express_1.Router)();
v1mainRouter.use("/api/v1", brain_routes_1.default);
v1mainRouter.use("/api/v1", content_routes_1.default);
exports.default = v1mainRouter;
