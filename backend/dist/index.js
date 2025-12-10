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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_1 = __importDefault(require("./routes/main"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(main_1.default);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGODB_URL) {
        throw new Error("Missing DB URL in environment variables.");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT SECRET KEY in environment variables.");
    }
    if (!process.env.PORT) {
        throw new Error("Missing PORT in environment variables.");
    }
    if (!process.env.VOYAGE_API_KEY) {
        throw new Error("Missing Voyage AI API Key.");
    }
    yield mongoose_1.default.connect(process.env.MONGODB_URL);
    app.listen(Number(process.env.PORT), () => console.log(`MindMeh backend running on port ${Number(process.env.PORT)}`));
});
main();
