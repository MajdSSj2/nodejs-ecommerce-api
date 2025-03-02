const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlingth: [2, "name must be longer thean 2"],
      maxlingth: [32, "name must be shorter than 32"],
      unique: [true, "name must be unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subCategory must belong to a parent category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subCategorySchema);
console.log();
