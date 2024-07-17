const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const axios = require("axios");
const { isLoggedIn, ensureAuthenticated } = require("../config/authMiddleware");

// Load User model
const User = require("../models/User");

// Register Page
router.get("/register", isLoggedIn, (req, res) => res.render("register"));

// Register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  let errors = [];

  if (!username || !password) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      password,
    });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        errors.push({ msg: "Username already exists" });
        res.render("register", {
          errors,
          username,
          password,
        });
      } else {
        const newUser = new User({
          username,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.redirect(
                  "/login?message=You+are+now+registered+and+can+log+in"
                );
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login Page
router.get("/login", isLoggedIn, (req, res) => res.render("login"));

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      return res.status(200).json({ success: true });
    });
  })(req, res, next);
});

// Google login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account", // Prompt to select an account each time
  })
);

// Retrieve user data
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard",
  })
);

// Route if something goes wrong
router.get("/login-failure", (req, res) => {
  res.send("login failed...");
});

// Destroy user session
router.get("/logout", ensureAuthenticated, async (req, res) => {
  try {
    if (req.user && req.user.accessToken) {
      const url = `https://accounts.google.com/o/oauth2/revoke?token=${req.user.accessToken}`;
      try {
        const response = await axios.get(url);
        console.log("Token revoked:", response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log("Token might be already invalidated or expired.");
        } else {
          throw error;
        }
      }
    }

    req.logout((err) => {
      if (err) {
        console.log("Error logging out:", err);
        return res.send("Error logging out");
      }

      req.session.destroy((error) => {
        if (error) {
          console.log("Error destroying session:", error);
          return res.send("Error destroying session");
        } else {
          res.clearCookie("connect.sid", { path: "/" });
          res.redirect("/?message=You+are+logged+out");
        }
      });
    });
  } catch (error) {
    console.log("Unexpected error during logout:", error);
    res.send("Error logging out");
  }
});

module.exports = router;
