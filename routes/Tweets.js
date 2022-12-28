const {
  getTweets,
  saveTweet,
  getTweetById,
  updateTweet,
  deleteTweet,
} = require("../controllers/Tweets");

module.exports = (app) => {
  const router = require("express").Router();

  router.get("/", getTweets);
  router.get("/:id", getTweetById);
  router.post("/add", saveTweet);
  router.patch("/edit/:id", updateTweet);
  router.delete("/delete/:id", deleteTweet);

  app.use("/tweet", router);
};
