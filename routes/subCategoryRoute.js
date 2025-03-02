const express = require("express");
const {
  getAllSubCategories,
  getSubCategoryByID,
  updateSubCategory,
  createSubCategory,
  deleteSubCategory,
  setCategoryIdBody,
  setFilterObject,
} = require("../controllers/subCategoryController");
const {
  getSubCategoryValidators,
  createSubCategoryValidators,
  updateSubCategoryValidators,
  deleteSubCategoryValidators,
} = require("../utils/validators/subCategoryValidators");

//merge params: allows to access paramas from other routers
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(setFilterObject, getAllSubCategories)
  .post(setCategoryIdBody, createSubCategoryValidators, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidators, getSubCategoryByID)
  .put(updateSubCategoryValidators, updateSubCategory)
  .delete(deleteSubCategoryValidators, deleteSubCategory);
module.exports = router;
