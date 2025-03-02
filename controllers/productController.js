const productModel = require("../models/productModel");
const factoryHandler = require("./handlersFactory");

exports.getProducts = factoryHandler.getAllModels(productModel);

/*
  @desc get product by id
  @route POST /api/v1/products/id
  @access public
*/

exports.getProductByID = factoryHandler.getModelById(productModel);

/*
  @desc create product
  @route POST /api/v1/products
  @access private
*/
exports.createProduct = factoryHandler.createModle(productModel);

/*
  @desc update product
  @route update /api/v1/products/:id
  @access private
*/

exports.updateProduct = factoryHandler.UpdateModle("product", productModel);

/*
  @desc delete product
  @route delete /api/v1/products/:id
  @access private
*/

exports.deleteProduct = factoryHandler.deleteOne(productModel);
