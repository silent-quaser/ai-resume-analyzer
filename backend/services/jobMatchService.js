const jobRoles = [
  {
    role: "Frontend Developer",
    skills: [
      "html",
      "css",
      "javascript",
      "react",
      "next.js",
      "tailwind",
      "git",
    ],
  },
  {
    role: "Backend Developer",
    skills: [
      "node",
      "express",
      "mongodb",
      "sql",
      "api",
      "jwt",
      "git",
    ],
  },
  {
    role: "Full Stack Developer",
    skills: [
      "react",
      "node",
      "express",
      "mongodb",
      "javascript",
      "api",
      "git",
    ],
  },
  {
    role: "Software Engineer",
    skills: [
      "java",
      "python",
      "javascript",
      "git",
      "sql",
      "problem solving",
    ],
  },
  {
    role: "Data Analyst",
    skills: [
      "python",
      "sql",
      "excel",
      "power bi",
      "statistics",
    ],
  },
  {
    role: "AI Engineer",
    skills: [
      "python",
      "machine learning",
      "ai",
      "tensorflow",
      "pytorch",
    ],
  },
  {
    role: "DevOps Engineer",
    skills: [
      "aws",
      "docker",
      "kubernetes",
      "linux",
      "ci/cd",
    ],
  },
];

const matchJobs = (resumeText) => {
  const resume =
    resumeText.toLowerCase();

  return jobRoles
    .map((job) => {
      const matchedSkills =
        job.skills.filter((skill) =>
          resume.includes(skill)
        );

      const score = Math.round(
        (matchedSkills.length /
          job.skills.length) *
          100
      );

      return {
        role: job.role,
        score,
        matchedSkills,
        missingSkills:
          job.skills.filter(
            (skill) =>
              !matchedSkills.includes(
                skill
              )
          ),
      };
    })
    .sort(
      (a, b) => b.score - a.score
    );
};

module.exports = {
  matchJobs,
};