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
