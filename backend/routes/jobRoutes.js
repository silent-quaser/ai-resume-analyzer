const express = require("express");

const {
  getJobMatches,
} = require("../controllers/jobController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/match",
  protect,
  getJobMatches
);

module.exports = router;