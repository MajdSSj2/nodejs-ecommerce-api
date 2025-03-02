const sharp = require("sharp");

const { v4: uuidv4 } = require("uuid");

const categoryModel = require("../models/categoryModel");
const factoryHandler = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
/*
@desc get list of categories
@route get /api/v1/categories
@access puplic
*/
exports.getCategories = factoryHandler.getAllModels(categoryModel);

/*
 @desc get category by id
 @route POST /api/v1/categories/id
 @access puplic
*/
exports.getCategoryByID = factoryHandler.getModelById(categoryModel);

exports.uploadCategoryImage = uploadSingleImage("image");

exports.processImage = async (req, res, next) => {
  console.log(req.file);
  req.fileBuffer = req.file.buffer;

  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${fileName}`);
  req.body.image = fileName;
  next();
};
/*
 @desc create category
 @route POST /api/v1/categories
 @access private
*/
exports.createCategory = factoryHandler.createModle(categoryModel);

/*
 @desc update  category
 @route update /api/v1/categories
 @access private
*/

exports.updateCategory = factoryHandler.UpdateModle("category", categoryModel);
/*
 @desc delete category
 @route delete /api/v1/categories
 @access private
*/
exports.deleteCategory = factoryHandler.deleteOne(categoryModel);
