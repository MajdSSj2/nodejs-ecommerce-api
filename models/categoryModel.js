const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category required"],
      unique: [true, "category must be unique"],
      minlength: [3, "name is too short"],
      maxlength: [32, "name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const getImageLink = (doc) => {
  if (doc.image) {
    doc.image = `${process.env.BASE_URL}/categories/${doc.image}`;
  }
};

categorySchema.post("init", (doc) => {
  getImageLink(doc);
});

categorySchema.post("save", (doc) => {
  getImageLink(doc);
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
