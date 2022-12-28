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
    quantity: {
      type: Number,
      require: false,
      default: 0,
    },
  });
  return mongoose.model("Products", Product);
};
