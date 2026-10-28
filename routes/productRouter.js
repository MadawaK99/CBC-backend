import express from 'express';
import { getProducts,saveProducts,deleteProduct } from '../controllers/productController.js';

const productRouter =express.Router();

productRouter.get("/",getProducts);
productRouter.post("/",saveProducts);
productRouter.delete("/",deleteProduct);

export default productRouter;