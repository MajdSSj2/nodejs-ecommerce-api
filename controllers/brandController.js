const sharp = require("sharp");

const { v4: uuidv4 } = require("uuid");
const brandModel = require("../models/brandModel");
const factoryHandler = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

//upload a brand image
exports.uploadBrandImage = uploadSingleImage("image");

//edit the image
exports.processImage = async (req, res, next) => {
  console.log(req.file);
  req.fileBuffer = req.file.buffer;

  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${fileName}`);
  req.body.image = fileName;
  next();
};

/*
@desc get list of Brands
@route get /api/v1/categories/Brands
@access puplic
*/
exports.getBrands = factoryHandler.getAllModels(brandModel);

/*
 @desc get Brand by id
 @route POST /api/v1/brands/id
 @access puplic
*/
exports.getBrandByID = factoryHandler.getModelById(brandModel);

/*
 @desc create brand
 @route POST /api/v1/brands
 @access private
*/
exports.createBrand = factoryHandler.createModle(brandModel);
/*
 @desc update  brand
 @route update /api/v1/brands
 @access private
*/

exports.updateBrand = factoryHandler.UpdateModle("brand", brandModel);

/*
 @desc delete  brand
 @route update /api/v1/brands
 @access private
*/

exports.deleteBrand = factoryHandler.deleteOne(brandModel);
