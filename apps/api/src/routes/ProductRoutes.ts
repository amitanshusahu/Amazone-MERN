import express from 'express';
const router = express.Router();
import { createProduct, getProducts, getProduct } from '../controllers/ProductController';
import { protect } from '../lib/middleware'

router.post('/createproduct', protect, createProduct);
router.get('/getproducts', getProducts);
router.get('/getproduct/:pid', getProduct);

export default router;