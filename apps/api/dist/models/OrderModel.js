"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    buyer: {
        type: String,
        require: true,
    },
    seller: {
        type: String,
        require: true,
    },
    pid: {
        type: String,
        require: true,
    }
});
const orderModel = mongoose_1.default.model("Orders", orderSchema);
exports.default = orderModel;
