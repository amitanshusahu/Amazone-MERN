"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: true,
    },
    pid: {
        type: String,
        require: true,
    }
});
const cartModel = mongoose_1.default.model("Cart", cartSchema);
exports.default = cartModel;
