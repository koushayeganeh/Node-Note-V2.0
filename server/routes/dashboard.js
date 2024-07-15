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

module.exports = router;
