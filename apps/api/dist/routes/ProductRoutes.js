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
router.post('/buyproduct', middleware_1.protect, ProductController_1.buyProduct);
router.get('/seller/getorder', middleware_1.protect, ProductController_1.getSellerOrders);
router.get('/buyer/getorder', middleware_1.protect, ProductController_1.getBuyerOrders);
router.post('/addtocart', middleware_1.protect, ProductController_1.addToCart);
router.get('/getcart', middleware_1.protect, ProductController_1.getCart);
router.post('/buyfromcart', middleware_1.protect, ProductController_1.buyfromcart);
exports.default = router;
