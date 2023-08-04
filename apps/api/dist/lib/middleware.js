"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function protect(req, res, next) {
    const secretKey = process.env.SECRET;
    const token = req.headers.authorization;
    if (!secretKey) {
        console.log("Secret Key Not found");
        return;
    }
    if (!token)
        return res.status(401).json({ status: false, msg: "NO Token Provied" });
    // verify the token
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err)
            return res.status(403).json({ status: false, msg: 'Failed To authorize' });
        if (!decoded)
            return res.status(403);
        if (typeof decoded == 'string')
            return res.status(403);
        req.headers.user = decoded.username;
        next();
    });
}
exports.protect = protect;
