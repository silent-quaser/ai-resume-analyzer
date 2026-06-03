const express = require("express");

const {
  generateQuestions,
} = require("../controllers/interviewController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/questions",
  protect,
  generateQuestions
);

module.exports = router;