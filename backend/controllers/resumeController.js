const {
  rewriteResumeWithGemini,
} = require("../services/geminiService");

const rewriteResume = async (
  req,
  res
) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        message:
          "Resume text is required",
      });
    }

    const improvedResume =
      await rewriteResumeWithGemini(
        resumeText
      );

    res.status(200).json({
      improvedResume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  rewriteResume,
};