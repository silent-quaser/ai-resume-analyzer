const {
  matchJobs,
} = require("../services/jobMatchService");

const getJobMatches = async (
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

    const matches =
      matchJobs(resumeText);

    res.status(200).json({
      matches,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getJobMatches,
};