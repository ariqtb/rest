const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// const Routes = express.Router();
// const router = require("./routes");

try {
  mongoose.set("strictQuery", false);
  mongoose.connect("mongodb://127.0.0.1:27017/mongout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database Connected");
} catch (err) {
  console.log("Database Failed to Connect", err);
}

app.use(cors());
app.use(express.json());

// app.use("/products", router);
require("./routes")(app);
require("./routes/Tweets.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("LISTENING ON PORT 3000!"));
