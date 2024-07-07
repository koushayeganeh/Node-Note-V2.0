// GET - dashboard
exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description:
      "User Dashboard to view, add, update, and delete personal notes.",
  };

  res.render("./dashboard/index", {
    locals,
    layout: "./layouts/dashboard",
  });
};
