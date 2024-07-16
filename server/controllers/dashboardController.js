const mongoose = require("mongoose");
const Note = require("../models/Note");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// GET
// Dashboard

exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description:
      "User Dashboard to view, add, update, and delete personal notes.",
  };

  try {
    const notes = await Note.aggregate([
      { $match: { user: req.user._id } },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          title: {
            $cond: {
              if: { $gt: [{ $strLenCP: "$title" }, 50] },
              then: { $concat: [{ $substrCP: ["$title", 0, 50] }, "..."] },
              else: "$title",
            },
          },
          body: {
            $cond: {
              if: { $gt: [{ $strLenCP: "$body" }, 20] },
              then: { $concat: [{ $substrCP: ["$body", 0, 20] }, "..."] },
              else: "$body",
            },
          },
          createdAt: 1,
        },
      },
    ]);

    res.render("./dashboard/index", {
      userName: capitalizeFirstLetter(req.user.username),
      notes,
      locals,
      layout: "./layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// GET
// DashboardAddNote

exports.dashboardAddNote = async (req, res) => {
  const locals = {
    title: "Dashboard | Add Note",
    description: "Add a new note",
  };

  res.render("./dashboard/add-note", {
    locals,
    layout: "./layouts/dashboard",
  });
};

// POST
// DashboardAddNoteSubmit

exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// GET
// dashboardViewNote

exports.dashboardViewNote = async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);

  const locals = {
    title: `Dashboard | ${note.title}`,
    description: "note view page",
  };

  try {
    if (!note) {
      return res.status(404).send("Note not found");
    }
    res.render("./dashboard/note", {
      note,
      locals,
      layout: "./layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// POST
// dashboardUpdateNote

exports.dashboardUpdateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    note.title = req.body.title;
    note.body = req.body.body;
    await note.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
