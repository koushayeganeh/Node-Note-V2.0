const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, done) => {
        console.log("Received username:", username);
        console.log("Received password:", password);

        try {
          const user = await User.findOne({ username: username });
          if (!user) {
            console.log("User not found");
            return done(null, false, {
              message: "That username is not registered",
            });
          }

          console.log("User found:", user);

          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            console.log("Password match");
            return done(null, user);
          } else {
            console.log("Password incorrect");
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (err) {
          console.log("Error during authentication:", err);
          return done(err);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (token, tokenSecret, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          } else {
            user = new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              accessToken: token,
            });

            await user.save();
            return done(null, user);
          }
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
