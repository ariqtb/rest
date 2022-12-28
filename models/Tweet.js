const { ObjectId } = require("mongodb");
const { Schema } = require("mongoose");
module.exports = (mongoose) => {
  const Tweet = mongoose.Schema({
    text: {
      type: String,
      require: true,
    },
    created_at: {
      type: Date,
      require: true,
      default: Date.now,
    },
    id_str: {
      type: String,
      require: true,
      default: mongoose.Types.ObjectId,
    },
  });
  return mongoose.model("Tweets", Tweet);
};
