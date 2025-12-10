"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brain_routes_1 = __importDefault(require("./brain.routes"));
const content_routes_1 = __importDefault(require("./content.routes"));
const image_routes_1 = __importDefault(require("./image.routes"));
const forkbrain_routes_1 = __importDefault(require("./forkbrain.routes"));
const globalbrain_routes_1 = __importDefault(require("./globalbrain.routes"));
const v1mainRouter = (0, express_1.Router)();
v1mainRouter.use("/api/v1", brain_routes_1.default, content_routes_1.default, image_routes_1.default, forkbrain_routes_1.default, globalbrain_routes_1.default);
exports.default = v1mainRouter;
