const { check, body } = require("express-validator");
const slugify = require("slugify");

const validatorMiddleware = require("../../middlewares/validationMiddleware");

exports.getSubCategoryValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

exports.createSubCategoryValidators = [
  check("name")
    .notEmpty()
    .withMessage("name must not be empty")
    .isLength({ min: 3 })
    .withMessage("name must be greater than 3 characters")
    .isLength({ max: 32 })
    .withMessage("name must be lower than 32 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("category")
    .notEmpty()
    .withMessage("subcategory must belong to a category")
    .isMongoId()
    .withMessage("category id is required"),

  validatorMiddleware,
];

exports.updateSubCategoryValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
