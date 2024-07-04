// GET - homePage
exports.homePage = async (req, res) => {
  const locals = {
    title: "My Notes",
    description: "Kousha's personal notes",
  };

  res.render("index", {
    locals,
    layout: "../views/layouts/main",
  });
};
