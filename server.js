const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const DBconnection = require("./config/database");
const CateogryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const BrandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const ApiError = require("./utils/apiError");
const globalErrorHandler = require("./middlewares/errorMiddleware");

dotenv.config({ path: "config.env" });

const app = express();
DBconnection();

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//mount routes

app.use("/api/v1/categories", CateogryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", BrandRoute);
app.use("/api/v1/products", productRoute);

//handling unhandeled urls
app.use("*", (req, res, next) => {
  //create error and send it to error handling middleware

  next(new ApiError(`can't find this route ${req.originalUrl}`, 400));
});

//global error handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

//handle errors outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandeledRejection error: ${err.name} |${err.message}`);
  server.close(() => {
    console.log("server is shutting down ...");
    process.exit(1);
  });
});
