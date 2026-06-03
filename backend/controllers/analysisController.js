const Analysis = require("../models/Analysis");
const Notification = require("../models/Notification");

const {
  analyzeResumeWithGemini,
} = require("../services/geminiService");

const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        message:
          "Resume text and job description are required",
      });
    }

    const commonSkills = [
      "javascript",
      "react",
      "node.js",
      "node",
      "express",
      "mongodb",
      "python",
      "java",
      "sql",
      "aws",
      "docker",
      "git",
      "github",
      "html",
      "css",
      "tailwind",
      "next.js",
      "rest api",
      "responsive web design",
      "communication",
      "problem solving",
    ];

    const resumeLower =
      resumeText.toLowerCase();

    const jobLower =
      jobDescription.toLowerCase();

    const requiredSkills =
      commonSkills.filter((skill) =>
        jobLower.includes(skill)
      );

    const matchedSkills =
      requiredSkills.filter((skill) =>
        resumeLower.includes(skill)
      );

    const score =
      requiredSkills.length === 0
        ? 100
        : Math.round(
            (matchedSkills.length /
              requiredSkills.length) *
              100
          );

    let aiResult = {
  strengths: [],
  missingSkills: [],
  suggestions: [],
};

try {
  const geminiResponse =
    await analyzeResumeWithGemini(
      resumeText,
      jobDescription
    );

  aiResult = JSON.parse(
    geminiResponse
  );
} catch (error) {
  console.error(
    "Gemini Error:",
    error.message
  );

  aiResult = {
    strengths: [
      "Resume submitted successfully",
    ],
    missingSkills: [],
    suggestions: [
      "AI analysis temporarily unavailable",
    ],
  };
}

    const analysis =
      await Analysis.create({
        user: req.user._id,
        resumeText,
        jobDescription,
        score,
        strengths:
          aiResult.strengths || [],
        missingSkills:
          aiResult.missingSkills || [],
        suggestions:
          aiResult.suggestions || [],
      });

    await Notification.create({
      user: req.user._id,
      title: "Resume Analysis",
      message: `Your resume scored ${score}%`,
    });

    res.status(201).json({
      message: "Analysis completed",
      analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAnalysisHistory = async (
  req,
  res
) => {
  try {
    const analyses =
      await Analysis.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      count: analyses.length,
      analyses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const analyses =
      await Analysis.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    const totalAnalyses =
      analyses.length;

    const averageScore =
      totalAnalyses > 0
        ? Math.round(
            analyses.reduce(
              (sum, item) =>
                sum + item.score,
              0
            ) / totalAnalyses
          )
        : 0;

    const latestAnalysis =
      analyses.length > 0
        ? analyses[0]
        : null;

    res.status(200).json({
      totalAnalyses,
      averageScore,
      latestAnalysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const compareAnalyses = async (
  req,
  res
) => {
  try {
    const { oldId, newId } =
      req.params;

    const oldAnalysis =
      await Analysis.findById(oldId);

    const newAnalysis =
      await Analysis.findById(newId);

    if (
      !oldAnalysis ||
      !newAnalysis
    ) {
      return res.status(404).json({
        message:
          "Analysis not found",
      });
    }

    const improvement =
      newAnalysis.score -
      oldAnalysis.score;

    const oldMissing =
      oldAnalysis.missingSkills || [];

    const newMissing =
      newAnalysis.missingSkills || [];

    const addedSkills =
      oldMissing.filter(
        (skill) =>
          !newMissing.includes(skill)
      );

    const remainingSkills =
      newMissing;

    res.status(200).json({
      oldScore:
        oldAnalysis.score,
      newScore:
        newAnalysis.score,
      improvement,
      addedSkills,
      remainingSkills,
      oldAnalysisDate:
        oldAnalysis.createdAt,
      newAnalysisDate:
        newAnalysis.createdAt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const deleteAnalysis = async (
  req,
  res
) => {
  try {
    const analysis =
      await Analysis.findById(
        req.params.id
      );

    if (!analysis) {
      return res.status(404).json({
        message:
          "Analysis not found",
      });
    }

    if (
      analysis.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message:
          "Not authorized",
      });
    }

    await analysis.deleteOne();

    res.status(200).json({
      message:
        "Analysis deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAnalysisById = async (
  req,
  res
) => {
  try {
    const analysis =
      await Analysis.findById(
        req.params.id
      );

    if (!analysis) {
      return res.status(404).json({
        message:
          "Analysis not found",
      });
    }

    if (
      analysis.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message:
          "Not authorized",
      });
    }

    res.status(200).json(
      analysis
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  analyzeResume,
  getAnalysisHistory,
  getDashboardStats,
  compareAnalyses,
  deleteAnalysis,
  getAnalysisById,
};