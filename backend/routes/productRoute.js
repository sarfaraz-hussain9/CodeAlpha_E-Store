import express from "express";
import { authAdmin,authenticate } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable"
import checkId from "../middlewares/checkId.js";

import { addProduct, addProductReview, deleteProduct, fetchNew, fetchTop, getAllProduct, getAllProductsAdmin, getProduct, updateProduct } from "../controllers/productController.js";

const router=express.Router()

router.route("/").post(authenticate,authAdmin,formidable(),addProduct).get(getAllProduct)

router.route("/allProducts").get(authenticate,authAdmin,getAllProductsAdmin)

router.route("/:id/review").post(authenticate,checkId,addProductReview)

router.route("/top").get(fetchTop)
router.route("/new").get(fetchNew)

router.route("/:id").put(authenticate,authAdmin,formidable(),updateProduct).delete(authenticate,authAdmin,deleteProduct).get(getProduct)


export default router;