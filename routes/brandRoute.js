const express = require("express");
const {
  getBrands,
  getBrandByID,
  updateBrand,
  createBrand,
  deleteBrand,
  uploadBrandImage,
  processImage,
} = require("../controllers/brandController");

const {
  getBrandValidators,
  createBrandValidators,
  updateBrandValidators,
  deleteBrandValidators,
} = require("../utils/validators/brandsValidators");
const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryid/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getBrands)
  .post(uploadBrandImage, processImage, createBrandValidators, createBrand);
router
  .route("/:id")
  .get(getBrandValidators, getBrandByID)
  .put(uploadBrandImage, processImage, updateBrandValidators, updateBrand)
  .delete(deleteBrandValidators, deleteBrand);
module.exports = router;
