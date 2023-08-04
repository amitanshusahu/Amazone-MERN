"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    instock: {
        type: Number,
        require: true,
    },
    options: {
        type: String,
        require: true,
    },
    info: {
        type: String,
        require: true,
    },
    img1: {
        type: String,
        require: true,
    },
    img2: {
        type: String,
        require: true,
    },
    img3: {
        type: String,
        require: true,
    },
    img4: {
        type: String,
        require: true,
    }
});
const productModel = mongoose_1.default.model('Products', productSchema);
exports.default = productModel;
