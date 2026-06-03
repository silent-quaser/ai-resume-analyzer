const {
  generateInterviewQuestions,
} = require("../services/interviewService");

const generateQuestions =
  async (req, res) => {
    try {
      const { resumeText, role } =
        req.body;

      if (!resumeText || !role) {
        return res.status(400).json({
          message:
            "Resume text and role are required",
        });
      }

      let result = {
        questions: [],
      };

      try {
        const response =
          await generateInterviewQuestions(
            resumeText,
            role
          );

        result =
          JSON.parse(response);
      } catch (error) {
        console.error(
          "Gemini Error:",
          error.message
        );

        result = {
          questions: [
            "Tell me about yourself.",
            "What are your strengths?",
            "Explain one of your projects.",
            "What challenges did you face during development?",
            "Why are you interested in this role?",
          ],
        };
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

module.exports = {
  generateQuestions,
};