import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, rateProduct } from "../controllers/product-controller";

const productRouter = Router();

productRouter.route('/addProduct').post(addProduct);
productRouter.route('/deleteProduct').delete(deleteProduct);
productRouter.route('/getProductById').get(getProductById);
productRouter.route('/getProducts').get(getProducts);
productRouter.route('/rateProduct').post(rateProduct);


export default productRouter;