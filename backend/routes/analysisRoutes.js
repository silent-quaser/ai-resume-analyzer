const express = require("express");

const {
  analyzeResume,
  getAnalysisHistory,
  getDashboardStats,
  compareAnalyses,
  deleteAnalysis,
  getAnalysisById,
} = require("../controllers/analysisController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/analyze", protect, analyzeResume);

router.get("/history", protect, getAnalysisHistory);

router.get("/stats", protect, getDashboardStats);

router.get(
  "/compare/:oldId/:newId",
  protect,
  compareAnalyses
);

router.get(
  "/:id",
  protect,
  getAnalysisById
);

router.delete(
  "/:id",
  protect,
  deleteAnalysis
);

module.exports = router;