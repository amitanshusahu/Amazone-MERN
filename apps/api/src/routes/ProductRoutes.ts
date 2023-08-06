import express from 'express';
const router = express.Router();
import { createProduct, getProducts, getProduct, buyProduct, getSellerOrders, getBuyerOrders, addToCart, getCart, buyfromcart, updateProduct } from '../controllers/ProductController';
import { protect } from '../lib/middleware'

router.post('/createproduct', protect, createProduct);
router.post('/updateproduct', protect, updateProduct);
router.get('/getproducts',protect, getProducts);
router.get('/getproduct/:pid', getProduct);
router.post('/buyproduct', protect, buyProduct);
router.get('/seller/getorder', protect, getSellerOrders);
router.get('/buyer/getorder', protect, getBuyerOrders);
router.post('/addtocart', protect, addToCart);
router.get('/getcart', protect, getCart);
router.post('/buyfromcart', protect, buyfromcart);

export default router;