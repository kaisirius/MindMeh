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
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
const client = new mongodb_1.MongoClient(process.env.MONGODB_URL);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const database = client.db("MindMeh");
            const collection = database.collection("brains");
            const index = {
                name: "vector_index",
                type: "vectorSearch",
                definition: {
                    "fields": [
                        {
                            "type": "vector",
                            "path": "embedding",
                            "similarity": "dotProduct",
                            "numDimensions": 1024
                        }
                    ]
                }
            };
            const result = yield collection.createSearchIndex(index);
            console.log("Vector search Index setup done. " + result);
        }
        finally {
            yield client.close();
        }
    });
}
run().catch(console.dir);
