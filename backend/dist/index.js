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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const db_1 = require("./db/db");
const zodValidator_1 = __importDefault(require("./utils/zodValidator"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // zod validation
    const checkParsing = (0, zodValidator_1.default)(req);
    if (checkParsing.success) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        //hashing (along with salt)
        const hashedPass = yield bcrypt_1.default.hash(password, 5);
        try {
            yield db_1.userModel.create({
                username,
                password: hashedPass,
                email
            });
            res.status(200).json({
                message: "User signed up successfully."
            });
        }
        catch (e) {
            res.status(500).json({
                message: "Internal server error."
            });
        }
    }
    else {
        res.status(401).json({
            message: "Input validation failed.",
            error: checkParsing.error
        });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inpSchema = zod_1.default.object({
        email: zod_1.default.email(),
        password: zod_1.default.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, {
            message: "Password must have at least one lowercase letter, one uppercase letter and one special character."
        })
    });
    const checkParsing = inpSchema.safeParse(req.body);
    if (checkParsing.success) {
        // check in db
        try {
            const existingUser = yield db_1.userModel.findOne({
                email: req.body.email
            });
            if (existingUser) {
                // sign and return jwt
                const storedHashedPass = existingUser.password;
                const passMatchCheck = yield bcrypt_1.default.compare(req.body.password, storedHashedPass);
                if (passMatchCheck) {
                    const userId = existingUser._id.toString();
                    const token = jsonwebtoken_1.default.sign({
                        userId
                    }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: "Signed in successfully.",
                        token
                    });
                }
                else {
                    res.status(401).json({
                        message: "Invalid credentials."
                    });
                }
            }
            else {
                res.status(401).json({
                    message: "User does not exist."
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Internal server error.",
                error: e
            });
        }
    }
    else {
        res.status(401).json({
            message: "Input validation failed.",
            error: checkParsing.error
        });
    }
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.DB_URL);
    app.listen(process.env.PORT || 3000, () => console.log(`MindMeh backend running on port ${process.env.PORT || 3000}`));
});
main();
