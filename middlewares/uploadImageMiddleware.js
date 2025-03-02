const multer = require("multer");
const ApiError = require("../utils/apiError");

exports.uploadSingleImage = (fieldName) => {
  //1- disk Storage : save images to destination
  // const storage = multer.memoryStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/categories");
  //   },
  //   filename: function (req, file, cb) {
  //     //category-${id}-Date.now().jpeg
  //     const ext = file.mimetype.split("/")[1];
  //     const fileName = `category-${uuidv4()}-${Date.now()}.${ext}`;
  //     console.log(fileName);
  //     cb(null, fileName);
  //   },
  // });
  const multerStorage = multer.memoryStorage();

  // 2-  fileFilter : allow images only
  const multiFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("only images are allowed", 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multiFilter });
  return upload.single(fieldName);
};
