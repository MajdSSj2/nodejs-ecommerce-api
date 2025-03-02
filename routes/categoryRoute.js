const express = require("express");

const {
  getCategories,
  getCategoryByID,
  updateCategory,
  createCategory,
  deleteCategory,
  uploadCategoryImage,
  processImage,
} = require("../controllers/categoryController");
const {
  getCategoryValidators,
  createCategoryValidators,
  updateCategoryValidators,
  deleteCategoryValidators,
} = require("../utils/validators/categoryValidators");

const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryid/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    uploadCategoryImage,
    processImage,
    createCategoryValidators,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidators, getCategoryByID)
  .put(
    uploadCategoryImage,
    processImage,
    updateCategoryValidators,
    updateCategory
  )
  .delete(deleteCategoryValidators, deleteCategory);
module.exports = router;
