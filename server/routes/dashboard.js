const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { ensureAuthenticated } = require("../config/authMiddleware");

// dashboard routes
router.get("/dashboard", ensureAuthenticated, dashboardController.dashboard);

module.exports = router;
