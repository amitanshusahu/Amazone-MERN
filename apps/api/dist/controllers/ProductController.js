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
exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const types_1 = require("types");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // input validation
            const parsedInput = types_1.createProductInput.safeParse(req.body);
            if (!parsedInput.success) {
                return res.status(401).json({
                    status: false,
                    msg: 'Invalid Input'
                });
            }
            // Check if its a seller
            const { username, title, description, price, options, info, img1, img2, img3, img4 } = req.body;
            const user = yield UserModel_1.default.findOne({ username });
            if ((user === null || user === void 0 ? void 0 : user.type) != 'seller') {
                return res.status(403).json({ status: false, msg: 'Not A Seller' });
            }
            // Save product to db
            yield ProductModel_1.default.create({
                username,
                title,
                description,
                price,
                options,
                info,
                img1,
                img2,
                img3,
                img4
            });
            return res.status(200).json({ status: true });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.createProduct = createProduct;
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield ProductModel_1.default.find();
            return res.status(200).json({ stauts: true, products });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.getProducts = getProducts;
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pid = req.params.pid;
            const product = yield ProductModel_1.default.findById(pid);
            return res.status(200).json({ status: true, product });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.getProduct = getProduct;
