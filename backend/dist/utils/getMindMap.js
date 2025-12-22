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
exports.getMindMap = getMindMap;
const genai_1 = require("@google/genai");
const zod_1 = __importDefault(require("zod"));
const requiredOutputSchema = zod_1.default.object({
    // todo
    // need to think about this as of now leaving will edit this, need a recursive structure as structured output
    root: zod_1.default.string()
});
function getMindMap(contentMetadata) {
    return __awaiter(this, void 0, void 0, function* () {
        const AI = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `will think about this ${contentMetadata}`; // passing the whole meta data in prompt for A
        const response = yield AI.models.generateContent({
            model: "gemini-2.5-flash", // implicit caching support enabled by default, min token needed 1024
            contents: prompt,
            config: {
                tools: [
                    { urlContext: {} },
                    { googleSearch: {} }
                ],
                responseMimeType: "application/json",
                responseJsonSchema: zod_1.default.toJSONSchema(requiredOutputSchema),
                temperature: 0,
                topK: 2,
                topP: 0.1,
                seed: 42
            }
        });
        const mindmap = requiredOutputSchema.safeParse(JSON.parse(response.text));
        if (mindmap.success)
            return mindmap.data;
        return undefined;
    });
}
