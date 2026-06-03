const express = require("express");
const PDFDocument = require("pdfkit");

const Analysis = require("../models/Analysis");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/:analysisId",
  protect,
  async (req, res) => {
    try {
      const analysis =
        await Analysis.findById(
          req.params.analysisId
        );

      if (!analysis) {
        return res.status(404).json({
          message: "Analysis not found",
        });
      }

      const doc = new PDFDocument();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=ATS_Report_${analysis._id}.pdf`
      );

      doc.pipe(res);

      doc
        .fontSize(24)
        .text(
          "AI Resume Analyzer Report",
          {
            align: "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(18)
        .text(
          `ATS Score: ${analysis.score}%`
        );

      doc.moveDown();

      doc
        .fontSize(16)
        .text("Strengths");

      if (
        analysis.strengths &&
        analysis.strengths.length > 0
      ) {
        analysis.strengths.forEach(
          (item) => {
            doc.text(`• ${item}`);
          }
        );
      }

      doc.moveDown();

      doc
        .fontSize(16)
        .text("Missing Skills");

      analysis.missingSkills.forEach(
        (item) => {
          doc.text(`• ${item}`);
        }
      );

      doc.moveDown();

      doc
        .fontSize(16)
        .text("Suggestions");

      analysis.suggestions.forEach(
        (item) => {
          doc.text(`• ${item}`);
        }
      );

      doc.moveDown();

      doc.text(
        `Generated: ${new Date().toLocaleString()}`
      );

      doc.end();
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;