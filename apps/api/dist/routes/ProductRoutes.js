"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ProductController_1 = require("../controllers/ProductController");
const middleware_1 = require("../lib/middleware");
router.post('/createproduct', middleware_1.protect, ProductController_1.createProduct);
router.get('/getproducts', ProductController_1.getProducts);
router.get('/getproduct/:pid', ProductController_1.getProduct);
exports.default = router;
