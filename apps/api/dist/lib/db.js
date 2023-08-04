"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function dbconnect() {
    console.log("connecting to :", process.env.MONGO_URI);
    if (!process.env.MONGO_URI) {
        throw Error("No Mongo Uri in .env");
    }
    mongoose_1.default.connect(process.env.MONGO_URI)
        .then(() => {
        console.log("Db connection sucess!");
    })
        .catch(e => {
        console.log(e);
    });
}
exports.dbconnect = dbconnect;
;
