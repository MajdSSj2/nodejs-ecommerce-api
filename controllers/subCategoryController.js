const subCategoryModel = require("../models/subCategoryModel");
const factoryHandler = require("./handlersFactory");

exports.setCategoryIdBody = (req, res, next) => {
  //nested route
  if (!req.body.category) req.body.category = req.params.categoryid;
  next();
};

exports.setFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryid) filterObject = { category: req.params.categoryid };
  req.filterObject = filterObject;
  next();
};

exports.getAllSubCategories = factoryHandler.getAllModels(subCategoryModel);
/*
   @desc get subCategory by id
   @route POST /api/v1/subcategories/id
   @access puplic
  */
exports.getSubCategoryByID = factoryHandler.getModelById(subCategoryModel);

/*
   @desc update  subCategory
   @route update /api/v1/subcategories
   @access private
  */

exports.updateSubCategory = factoryHandler.UpdateModle(
  "subCategory",
  subCategoryModel
);

/*
   @desc delete  category
   @route delete/api/v1/subcategories
   @access private
  */

exports.deleteSubCategory = factoryHandler.deleteOne(subCategoryModel);

/*
 @desc create subCategory
 @route POST /api/v1/subcategories
 @access private
*/

exports.createSubCategory = factoryHandler.createModle(subCategoryModel);
