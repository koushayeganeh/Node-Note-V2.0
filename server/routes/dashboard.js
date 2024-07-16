const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { ensureAuthenticated } = require("../config/authMiddleware");

// dashboard routes
router.get("/dashboard", ensureAuthenticated, dashboardController.dashboard);

router.get(
  "/dashboard/add-note",
  ensureAuthenticated,
  dashboardController.dashboardAddNote
);

router.post(
  "/dashboard/add-note",
  ensureAuthenticated,
  dashboardController.dashboardAddNoteSubmit
);

router.get(
  "/dashboard/note/:id",
  ensureAuthenticated,
  dashboardController.dashboardViewNote
);

router.put(
  "/dashboard/note/:id",
  ensureAuthenticated,
  dashboardController.dashboardUpdateNote
);

router.delete(
  "/dashboard/note/:id",
  ensureAuthenticated,
  dashboardController.dashboardDeleteNote
);

module.exports = router;
