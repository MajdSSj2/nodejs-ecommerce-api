const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validationMiddleware");

exports.getCategoryValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

exports.createCategoryValidators = [
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
  validatorMiddleware,
];

exports.updateCategoryValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteCategoryValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
