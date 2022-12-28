const mongoose = require("mongoose");
const Tweet = require("../models/Tweet.js")(mongoose);

exports.getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.json(tweets);
    // res.json({ message: "Worked!" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getTweetById = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet === null) res.json({ message: "Id not found !" });
    res.json(tweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.saveTweet = async (req, res) => {
  const tweet = new Tweet(req.body);
  try {
    const savedTweet = await tweet.save();
    res.status(201).json(savedTweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTweet = async (req, res) => {
  const checkId = await Tweet.findById(req.params.id);
  if (!checkId) res.status(404).json({ message: "Data not found !" });

  try {
    const updatedTweet = await Tweet.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedTweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTweet = async (req, res) => {
  const checkId = await Tweet.findById(req.params.id);
  if (!checkId) res.status(404).json({ message: "Data not found !" });

  try {
    const deletedTweet = await Tweet.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedTweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
