const express = require("express");
const {
  getProducts,
  newProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeUser,
} = require("../middleware/authenticate");

router.route("/products").get(isAuthenticatedUser, getProducts);

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeUser("admin"), newProduct);

router.route("/product/:id").get(singleProduct);

router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeUser("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeUser("admin"), deleteProduct);

module.exports = router;
