"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function ComparePage() {
  const [analyses, setAnalyses] = useState([]);

  const [oldId, setOldId] = useState("");
  const [newId, setNewId] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analysis/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAnalyses(data.analyses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompare = async () => {
    if (!oldId || !newId) {
      alert("Please select two analyses");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analysis/compare/${oldId}/${newId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Comparison failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Resume Comparison
      </h1>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold">
              Old Analysis
            </label>

            <select
              value={oldId}
              onChange={(e) =>
                setOldId(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl p-3"
            >
              <option value="">
                Select Analysis
              </option>

              {analyses.map((analysis) => (
                <option
                  key={analysis._id}
                  value={analysis._id}
                >
                  {analysis.score}% —
                  {" "}
                  {new Date(
                    analysis.createdAt
                  ).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              New Analysis
            </label>

            <select
              value={newId}
              onChange={(e) =>
                setNewId(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl p-3"
            >
              <option value="">
                Select Analysis
              </option>

              {analyses.map((analysis) => (
                <option
                  key={analysis._id}
                  value={analysis._id}
                >
                  {analysis.score}% —
                  {" "}
                  {new Date(
                    analysis.createdAt
                  ).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCompare}
          className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-6 py-3 rounded-xl"
        >
          {loading
            ? "Comparing..."
            : "Compare"}
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <p className="text-gray-400">
                Old Score
              </p>

              <h2 className="text-5xl font-bold">
                {result.oldScore}%
              </h2>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <p className="text-gray-400">
                New Score
              </p>

              <h2 className="text-5xl font-bold text-green-400">
                {result.newScore}%
              </h2>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <p className="text-gray-400">
                Improvement
              </p>

              <h2 className="text-5xl font-bold text-blue-400">
                +{result.improvement}%
              </h2>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Skills Improved
            </h2>

            <div className="flex flex-wrap gap-2">
              {result.addedSkills.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="bg-green-950 border border-green-800 px-3 py-2 rounded-lg"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              Remaining Skill Gaps
            </h2>

            <div className="flex flex-wrap gap-2">
              {result.remainingSkills.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="bg-yellow-950 border border-yellow-800 px-3 py-2 rounded-lg"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}