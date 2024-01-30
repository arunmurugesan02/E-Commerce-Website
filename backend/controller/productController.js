const Product = require("../modal/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

//Get all  product - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  // const resPerPage = 2;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate();
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

//Create a new product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  console.log(req.user);
  req.body.user = {
    id: req.user.id,
    role: req.user.role,
  };
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get single product - api/v1/product/:id
exports.singleProduct = catchAsyncError(async (req, res, next) => {
  //starting catchAsyncError check pannum
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400)); //first error handler poitu - Error object generate pannitu next middleware ku pogi error check pannum
  }

  res.status(201).json({
    success: true,
    product,
  });
});

//Update Product - /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product - /api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
