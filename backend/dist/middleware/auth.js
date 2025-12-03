"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    const header = req.headers.authentication;
    if (header && typeof header === "string") {
        const token = header.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            next();
        }
        catch (e) {
            res.status(401).json({
                message: "Invalid JWT.",
                error: e
            });
        }
    }
    else {
        res.status(401).json({
            message: "Invalid auth header."
        });
    }
}
