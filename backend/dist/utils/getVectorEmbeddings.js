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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbedding = getEmbedding;
const voyageai_1 = require("voyageai");
const client = new voyageai_1.VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY });
function getEmbedding(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield client.embed({
            input: text,
            model: "voyage-3-large"
        });
        const embedding = results.data[0].embedding;
        return embedding;
    });
}
