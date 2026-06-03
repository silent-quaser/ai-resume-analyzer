"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "../../../components/DashboardLayout";

export default function AnalysisDetailsPage() {
  const { id } = useParams();

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analysis/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setAnalysis(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert(
        "Failed to load analysis"
      );
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80)
      return "text-green-400";

    if (score >= 60)
      return "text-yellow-400";

    return "text-red-400";
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading analysis...</p>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout>
        <p>Analysis not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">
          Full Analysis Report
        </h1>

        <p className="text-gray-500">
          {new Date(
            analysis.createdAt
          ).toLocaleString()}
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 mb-8">
        <h2
          className={`text-5xl font-bold mb-3 ${getScoreColor(
            analysis.score
          )}`}
        >
          {analysis.score}%
        </h2>

        <p className="text-gray-400">
          ATS Compatibility Score
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            Strengths
          </h2>

          {(analysis.strengths || []).map(
            (item, index) => (
              <div
                key={index}
                className="mb-3"
              >
                ✓ {item}
              </div>
            )
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Missing Skills
          </h2>

          {(analysis.missingSkills || []).map(
            (item, index) => (
              <div
                key={index}
                className="mb-3"
              >
                • {item}
              </div>
            )
          )}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 mb-8">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          Suggestions
        </h2>

        {(analysis.suggestions || []).map(
          (item, index) => (
            <div
              key={index}
              className="mb-3"
            >
              • {item}
            </div>
          )
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4">
            Resume Text
          </h2>

          <div className="whitespace-pre-wrap text-gray-300">
            {analysis.resumeText}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4">
            Job Description
          </h2>

          <div className="whitespace-pre-wrap text-gray-300">
            {analysis.jobDescription}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}