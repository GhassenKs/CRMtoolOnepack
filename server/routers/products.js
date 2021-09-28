const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/products");

router.get("/getProducts", ProductController.getProducts);
router.get("/getProduct/:id", ProductController.getProduct);
router.post("/addProduct", ProductController.addProduct);
router.put("/updateProduct/:id", ProductController.updateProduct);
router.delete("/removeProduct/:id", ProductController.removeProduct);
router.put("/addUserToProduct/:id", ProductController.addUserToProduct);

module.exports = router;
