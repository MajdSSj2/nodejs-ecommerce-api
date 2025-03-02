const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
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
    doc.image = `${process.env.BASE_URL}/brands/${doc.image}`;
  }
};

BrandSchema.post("init", (doc) => {
  getImageLink(doc);
});

BrandSchema.post("save", (doc) => {
  getImageLink(doc);
});

const brandModel = mongoose.model("Brand", BrandSchema);
module.exports = brandModel;
