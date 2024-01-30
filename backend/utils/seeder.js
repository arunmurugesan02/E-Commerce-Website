const connectedDatabase = require("../config/database");
const products = require("../data/products.json");
const Product = require("../modal/productModel");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "backend/config/config.env" });
connectedDatabase();

const seedProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("Product deleted!!!");
    await Product.insertMany(products);
    console.log("All products inserted");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

seedProduct();
