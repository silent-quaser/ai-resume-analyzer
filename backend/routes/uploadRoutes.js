const express = require("express");
const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/resume",
  protect,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const pdfBuffer = fs.readFileSync(
        req.file.path
      );

      const parser = new PDFParse({
        data: pdfBuffer,
      });

      const pdfData = await parser.getText();

      res.status(200).json({
        message: "PDF processed successfully",
        fileName: req.file.filename,
        extractedText: pdfData.text,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  }
);

module.exports = router;