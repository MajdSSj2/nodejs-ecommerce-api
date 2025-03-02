const fs = require("fs");
const dotenv = require("dotenv");
const dbConnection = require("../../../config/database");
const productsModel = require("../../../models/productModel");

dotenv.config({ path: " ../../../../../config.env" });
//connect to db
dbConnection();

const data = JSON.parse(fs.readFileSync("./products.json"));

console.log(process.argv[2]);

const insertProducts = async () => {
  try {
    await productsModel.create(data);
    console.log("data inserted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await productsModel.deleteMany();
    console.log("data deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  insertProducts();
}

if (process.argv[2] === "-d") {
  deleteData();
}
