const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/productController");

const router = express.Router();

router.route("/product/new").post(createProduct)
router.route("/products").get(getAllProducts)
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getSingleProduct)
// router.route("/product/:id").delete(deleteProduct)

module.exports = router