"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyFromCart = exports.addToCartInput = exports.OrderInput = exports.createProductInput = exports.loginInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    type: zod_1.z.string()
});
exports.loginInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.createProductInput = zod_1.z.object({
    username: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    options: zod_1.z.array(zod_1.z.string()),
    info: zod_1.z.string(),
    img1: zod_1.z.string(),
    img2: zod_1.z.string(),
    img3: zod_1.z.string(),
    img4: zod_1.z.string()
});
exports.OrderInput = zod_1.z.object({
    seller: zod_1.z.string(),
    pid: zod_1.z.string(),
});
exports.addToCartInput = zod_1.z.object({
    pid: zod_1.z.string(),
});
exports.buyFromCart = zod_1.z.object({
    pid: zod_1.z.array(zod_1.z.string()),
    seller: zod_1.z.array(zod_1.z.string()),
});
