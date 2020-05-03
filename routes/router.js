const express = require("express");
const router = express.Router();
const Auth = require("../controllers/Auth");
const registerDetailController = require("../controllers/registerController");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to crownstack"
  });
});
router.post("/users/login", registerDetailController.loginByUser);
router.post("/users/register", registerDetailController.createUser);
router.use(Auth.VerifyToken);
router.post("/users/add-to-cart", registerDetailController.addToCart);
router.get("/users/cart-details", registerDetailController.cartDetails);
router.post("/save-product", productController.saveProduct);
router.post("/save-category", categoryController.saveCategory);
router.get("/product-list", productController.productList);
router.get("/category-list", categoryController.categoryList);
router.get("/product-list-categoryWise", productController.productListCategoryWise);
module.exports = router;