"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const home_routes_1 = __importDefault(require("./home.routes"));
const viewOnly_route_1 = __importDefault(require("./viewOnly.route"));
const v1main_1 = __importDefault(require("./v1/v1main"));
const mainRouter = (0, express_1.Router)();
mainRouter.use(auth_routes_1.default);
mainRouter.use(v1main_1.default);
mainRouter.use("/home", home_routes_1.default);
mainRouter.use("/view", viewOnly_route_1.default);
exports.default = mainRouter;
