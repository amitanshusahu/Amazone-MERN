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
exports.updateProduct = exports.buyfromcart = exports.getCart = exports.addToCart = exports.getSellerOrders = exports.getBuyerOrders = exports.buyProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const utils_1 = require("../lib/utils");
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const CartModel_1 = __importDefault(require("../models/CartModel"));
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
            // Check if the usename is a seller
            if (typeof req.headers.user == 'string') {
                const isseller = yield (0, utils_1.isSeller)(req.headers.user);
                if (isseller) {
                    const products = yield ProductModel_1.default.find({ username: req.headers.user });
                    return res.status(200).json({ stauts: true, products });
                }
                else {
                    const products = yield ProductModel_1.default.find();
                    return res.status(200).json({ stauts: true, products });
                }
            }
            return res.status(500).json({ stauts: true, msg: 'something went wrong' });
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
function buyProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // input validation
            const parsedInput = types_1.OrderInput.safeParse(req.body);
            if (!parsedInput.success) {
                return res.status(401).json({
                    status: false,
                    msg: 'Invalid Input'
                });
            }
            // Check if the username is a buyer, save buy to db
            const { seller, pid } = req.body;
            if (typeof req.headers.user == 'string') {
                const isseller = yield (0, utils_1.isSeller)(req.headers.user);
                if (!isseller) {
                    const isthisseller = yield (0, utils_1.isSeller)(seller);
                    if (isthisseller) {
                        yield OrderModel_1.default.create({ buyer: req.headers.user, seller, pid });
                        return res.status(200).json({ status: true });
                    }
                }
                else {
                    return res.status(200).json({ status: false, msg: 'You are not a buyer' });
                }
            }
            return res.status(200).json({ status: false, msg: 'Something went wrong' });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.buyProduct = buyProduct;
function getBuyerOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the usename is a buyer
            if (typeof req.headers.user == 'string') {
                const isseller = yield (0, utils_1.isSeller)(req.headers.user);
                if (!isseller) {
                    const orders = yield OrderModel_1.default.find({ buyer: req.headers.user });
                    return res.status(200).json({ status: true, orders });
                }
                else {
                    return res.status(403).json({ status: false, msg: "This is'nt a buyer account" });
                }
            }
            return res.status(500).json({ status: false, msg: 'Somethng Went Wrong' });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.getBuyerOrders = getBuyerOrders;
function getSellerOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the usename is a seller
            if (typeof req.headers.user == 'string') {
                const isseller = yield (0, utils_1.isSeller)(req.headers.user);
                if (isseller) {
                    const orders = yield OrderModel_1.default.find({ seller: req.headers.user });
                    return res.status(200).json({ status: true, orders });
                }
                else {
                    return res.status(403).json({ status: false, msg: "This is'nt a seller account" });
                }
            }
            return res.status(500).json({ status: false, msg: 'Somethng Went Wrong' });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.getSellerOrders = getSellerOrders;
function addToCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // input validation
            const parsedInput = types_1.addToCartInput.safeParse(req.body);
            if (!parsedInput.success) {
                return res.status(401).json({
                    status: false,
                    msg: 'Invalid Input'
                });
            }
            // Check if the usename is a buyer
            const { pid } = req.body;
            if (typeof req.headers.user == 'string') {
                const isseller = yield (0, utils_1.isSeller)(req.headers.user);
                if (!isseller) {
                    yield CartModel_1.default.create({ username: req.headers.user, pid });
                    return res.status(200).json({ status: true });
                }
                else {
                    return res.status(403).json({ status: false, msg: "This is'nt a buyer account" });
                }
            }
            return res.status(500).json({ status: false, msg: 'Somethng Went Wrong' });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.addToCart = addToCart;
function getCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the usename is a buyer
            if (typeof req.headers.user == 'string') {
                const isseller = yield (0, utils_1.isSeller)(req.headers.user);
                if (!isseller) {
                    const cart = yield CartModel_1.default.find({ username: req.headers.user });
                    return res.status(200).json({ status: true, cart });
                }
                else {
                    return res.status(403).json({ status: false, msg: "This is'nt a buyer account" });
                }
            }
            return res.status(500).json({ status: false, msg: 'Somethng Went Wrong' });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.getCart = getCart;
function buyfromcart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // input validation
            const parsedInput = types_1.buyFromCart.safeParse(req.body);
            if (!parsedInput.success) {
                return res.status(401).json({
                    status: false,
                    msg: 'Invalid Input'
                });
            }
            // Check if the usename is a buyer
            const { pid, seller } = req.body;
            if (typeof req.headers.user == 'string') {
                const isseller = yield (0, utils_1.isSeller)(req.headers.user);
                if (!isseller) {
                    for (let i = 0; i < pid.length; i++) {
                        yield OrderModel_1.default.create({ pid: pid[i], seller: seller[i], buyer: req.headers.user });
                        yield CartModel_1.default.findOneAndDelete({ pid: pid[i], username: req.headers.user });
                    }
                    return res.status(200).json({ status: true });
                }
                else {
                    return res.status(403).json({ status: false, msg: "This is'nt a buyer account" });
                }
            }
            return res.status(500).json({ status: false, msg: 'something went worng' });
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).json({ status: false, msg: 'Internal Server Error' });
        }
    });
}
exports.buyfromcart = buyfromcart;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // input validation
            const parsedInput = types_1.updateProductInput.safeParse(req.body);
            if (!parsedInput.success) {
                return res.status(401).json({
                    status: false,
                    msg: 'Invalid Input'
                });
            }
            // Check if its a seller
            const { pid, username, title, description, price, options, info, img1, img2, img3, img4 } = req.body;
            const user = yield UserModel_1.default.findOne({ username });
            if ((user === null || user === void 0 ? void 0 : user.type) != 'seller') {
                return res.status(403).json({ status: false, msg: 'Not A Seller' });
            }
            // Save product to db
            yield ProductModel_1.default.findByIdAndUpdate(pid, {
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
exports.updateProduct = updateProduct;
