const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validationMiddleware");

exports.getBrandValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

exports.createBrandValidators = [
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

exports.updateBrandValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteBrandValidators = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
