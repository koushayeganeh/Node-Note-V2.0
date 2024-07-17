// GET - homePage
const { isLoggedIn } = require("../config/authMiddleware");

exports.homePage = async (req, res) => {
  const locals = {
    title: "My Notes",
    description: "Best Notes App Ever",
  };

  res.render("index", {
    locals,
    user: req.user, // Pass the user object to the template
    layout: "../views/layouts/main",
  });
};
