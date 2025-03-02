const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidators");

const {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProductByID)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
