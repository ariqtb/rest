const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "758027147236-3ld6tg7daf0d58mkv93m2npp8pdl1k0v.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      return done(null, profile);
      //   });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
