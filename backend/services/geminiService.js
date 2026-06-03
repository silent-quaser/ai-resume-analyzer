const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResumeWithGemini = async (
  resumeText,
  jobDescription
) => {
  const prompt = `
You are an ATS Resume Analyzer.

Analyze the resume against the job description.

Return ONLY a valid JSON object.

Do not include markdown.
Do not include explanations.
Do not include any text before or after the JSON.

Use this exact format:

{
  "strengths": [
    "Strong React experience"
  ],
  "missingSkills": [
    "AWS"
  ],
  "suggestions": [
    "Add AWS project experience"
  ]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

const rewriteResumeWithGemini = async (
  resumeText
) => {
  const prompt = `
You are an expert resume writer.

Improve the following resume.

Requirements:

- Make wording professional.
- Improve impact statements.
- Use action verbs.
- Improve readability.
- Keep information truthful.
- Do not invent experience.
- Keep formatting clean.

Return ONLY the improved resume text.

Resume:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text.trim();
};

module.exports = {
  analyzeResumeWithGemini,
  rewriteResumeWithGemini,
};