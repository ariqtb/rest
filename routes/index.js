const {
  saveProducts,
  getProducts,
  updateProduct,
  getProductById,
  deleteProduct,
} = require("../controllers");

module.exports = (app) => {
  const router = require("express").Router();

  router.get("/products", getProducts);

  router.get("/products/:id", getProductById);

  router.post("/add", saveProducts);

  router.patch("/edit/:id", updateProduct);

  router.delete("/delete/:id", deleteProduct);

  app.use("/", router);
};
