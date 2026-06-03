"use client";

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function JobsPage() {
  const [resumeText, setResumeText] =
    useState("");

  const [matches, setMatches] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleMatch = async () => {
    if (!resumeText.trim()) {
      alert("Please enter resume text");
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/match`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resumeText,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setMatches(data.matches);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getColor = (score) => {
    if (score >= 80)
      return "text-green-400";

    if (score >= 60)
      return "text-yellow-400";

    return "text-red-400";
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Job Match Engine
      </h1>

      <div className="mb-6">
        <textarea
          value={resumeText}
          onChange={(e) =>
            setResumeText(
              e.target.value
            )
          }
          rows={12}
          className="w-full rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 outline-none"
          placeholder="Paste your resume text..."
        />
      </div>

      <button
        onClick={handleMatch}
        className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-6 py-3 rounded-xl font-semibold"
      >
        {loading
          ? "Matching..."
          : "Find Matching Jobs"}
      </button>

      {matches.length > 0 && (
        <div className="mt-8 space-y-6">
          {matches.map(
            (job, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {job.role}
                  </h2>

                  <span
                    className={`text-3xl font-bold ${getColor(
                      job.score
                    )}`}
                  >
                    {job.score}%
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-green-400 font-semibold mb-2">
                    Matched Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {job.matchedSkills.map(
                      (
                        skill,
                        skillIndex
                      ) => (
                        <span
                          key={
                            skillIndex
                          }
                          className="bg-green-950 border border-green-800 px-3 py-2 rounded-lg"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-yellow-400 font-semibold mb-2">
                    Missing Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {job.missingSkills.map(
                      (
                        skill,
                        skillIndex
                      ) => (
                        <span
                          key={
                            skillIndex
                          }
                          className="bg-yellow-950 border border-yellow-800 px-3 py-2 rounded-lg"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </DashboardLayout>
  );
}