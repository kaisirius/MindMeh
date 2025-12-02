"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = zodValidation;
const zod_1 = __importDefault(require("zod"));
const inpSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(25),
    password: zod_1.default.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, {
        message: "Password must have at least one lowercase letter, one uppercase letter and one special character."
    }),
    email: zod_1.default.email()
});
function zodValidation(req) {
    const checkParsing = inpSchema.safeParse(req.body);
    return checkParsing;
}
