const express = require("express");

const {
  rewriteResume,
} = require("../controllers/resumeController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/rewrite",
  protect,
  rewriteResume
);

module.exports = router;