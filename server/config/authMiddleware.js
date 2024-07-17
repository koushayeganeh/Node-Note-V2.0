exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  const locals = {
    title: "Access Denied!",
    description: "You can not access this page without logging in!",
  };

  // res.send("You Don't have access to this page");
  res.render("./dashboard/access-denied", {
    locals,
    layout: "./layouts/main",
  });
};

exports.isLoggedIn = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).send("Access Denied");
  }
};
