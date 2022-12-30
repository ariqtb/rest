const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const app = express();
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require("./passport.setup");

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

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

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Aunthenticate with google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("something went wrong..");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) next();
  });
  req.session.destroy();
  res.send("Goodbye!");
});

// app.use("/products", router);
require("./routes")(app);
require("./routes/Tweets.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("LISTENING ON PORT 3000!"));
