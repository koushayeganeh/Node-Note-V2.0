// GET - homePage
exports.homePage = async (req, res) => {
  const locals = {
    title: "My Notes",
    description: "Best Notes App Ever",
  };

  res.render("index", {
    locals,
    layout: "../views/layouts/main",
  });
};
