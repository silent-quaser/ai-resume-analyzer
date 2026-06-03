const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateInterviewQuestions =
  async (resumeText, role) => {
    const prompt = `
You are an AI Interview Preparation Assistant.

Based on the candidate resume and selected role, generate 10 professional interview questions.

Return ONLY valid JSON.

Format:

{
  "questions": [
    "Question 1",
    "Question 2"
  ]
}

Role:
${role}

Resume:
${resumeText}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    const text = response.text;

    return text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  };

module.exports = {
  generateInterviewQuestions,
};