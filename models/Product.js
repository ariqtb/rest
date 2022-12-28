module.exports = (mongoose) => {
  const Product = mongoose.Schema({
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  });
  return mongoose.model("Products", Product);
};
