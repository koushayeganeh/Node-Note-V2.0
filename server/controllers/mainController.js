// GET - homePage
const { isLoggedIn } = require("../config/authMiddleware");

exports.homePage = async (req, res) => {
  const locals = {
    title: "90s Notes",
    description: "The retro notes you miss these days",
  };

  res.render("index", {
    locals,
    user: req.user, // Pass the user object to the template
    layout: "../views/layouts/main",
  });
};
