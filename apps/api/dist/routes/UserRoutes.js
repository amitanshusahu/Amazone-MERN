"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserController_1 = require("../controllers/UserController");
const middleware_1 = require("../lib/middleware");
router.post('/login', UserController_1.login);
router.post('/signup', UserController_1.signup);
router.get('/me', middleware_1.protect, UserController_1.me);
exports.default = router;
