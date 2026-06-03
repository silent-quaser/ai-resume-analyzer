"use client";

import { useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

export default function InterviewPage() {
  const [resumeText, setResumeText] =
    useState("");

  const [role, setRole] =
    useState("Frontend Developer");

  const [questions, setQuestions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Software Engineer",
    "AI Engineer",
    "Data Analyst",
    "DevOps Engineer",
  ];

  const generateQuestions =
    async () => {
      if (!resumeText.trim()) {
        alert(
          "Please enter resume text"
        );

        return;
      }

      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/interview/questions`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                resumeText,
                role,
              }),
            }
          );

        const data =
          await response.json();

        if (response.ok) {
          setQuestions(
            data.questions
          );
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);

        alert(
          "Failed to generate questions"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        AI Interview Preparation
      </h1>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 mb-8">
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          >
            {roles.map(
              (
                roleOption,
                index
              ) => (
                <option
                  key={index}
                  value={roleOption}
                >
                  {roleOption}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Resume Text
          </label>

          <textarea
            value={resumeText}
            onChange={(e) =>
              setResumeText(
                e.target.value
              )
            }
            rows={12}
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-4 outline-none"
            placeholder="Paste your resume text..."
          />
        </div>

        <button
          onClick={
            generateQuestions
          }
          className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-6 py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Generating..."
            : "Generate Questions"}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-3xl font-bold mb-6">
            Interview Questions
          </h2>

          <div className="space-y-4">
            {questions.map(
              (
                question,
                index
              ) => (
                <div
                  key={index}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-5"
                >
                  <p className="font-semibold mb-2">
                    Question{" "}
                    {index + 1}
                  </p>

                  <p className="text-gray-300">
                    {question}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}