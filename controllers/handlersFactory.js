const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeatures");

exports.deleteOne = (Model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError("No product with this ID", 404));
    }

    res.status(200).json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
    console.log(err.message);
  }
};

exports.UpdateModle = (modelName, Model) => async (req, res, next) => {
  try {
    const document = await Model.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!document) {
      return next(new ApiError(`No ${modelName} with this ID`, 404));
    }
    res.status(200).json({ data: document });
  } catch (err) {
    res.status(400).json({ msg: err.message });
    console.log(err.message);
  }
};

exports.createModle = (Model) => async (req, res) => {
  try {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  } catch (err) {
    res.status(400).json({ msg: err.message });
    console.log(err.message);
  }
};
exports.getAllModels = (Model) => async (req, res) => {
  const numOfDocuments = await Model.countDocuments();
  try {
    const apiFeature = new ApiFeature(Model.find(), req.query)
      .pagination(numOfDocuments)
      .fieldLimiting()
      .filter()
      .sort()
      .search();

    const { paginationInfo, mongooseQuery } = apiFeature;
    const docs = await mongooseQuery;

    res.status(200).json({ paginationInfo, result: docs.length, data: docs });
  } catch (err) {
    res.status(400).json({ msg: err.message });
    console.error(err.message);
  }
};

exports.getModelById = (Model) => async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const doc = await Model.findById(id);
    if (doc) {
      res.status(200).json({ data: doc });
    } else {
      return next(new ApiError("No doc with this ID", 404));
      //res.status(404).json({ msg: "No category with this ID" });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
    console.log(err.message);
  }
};
