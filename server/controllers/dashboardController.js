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

  res.render("./dashboard/index", {
    userName: capitalizeFirstLetter(req.user.username),
    locals,
    layout: "./layouts/dashboard",
  });
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
