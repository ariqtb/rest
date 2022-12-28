const {
  saveProducts,
  getProducts,
  updateProduct,
  getProductById,
  deleteProduct,
} = require("../controllers");

module.exports = (app) => {
  const router = require("express").Router();

  router.get("/", getProducts);

  router.get("/:id", getProductById);

  router.post("/add", saveProducts);

  router.patch("/edit/:id", updateProduct);

  router.delete("/delete/:id", deleteProduct);

  app.use("/product", router);
};
