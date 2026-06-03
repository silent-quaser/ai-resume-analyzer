"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "../../components/DashboardLayout";

export default function HistoryPage() {
  const router = useRouter();

  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchHistory(token);
  }, [router]);

  const fetchHistory = async (token) => {
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (analysisId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/report/${analysisId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `ATS_Report_${analysisId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download report");
    }
  };

  const deleteAnalysis = async (analysisId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmed) return;

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analysis/${analysisId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setAnalyses(
          analyses.filter(
            (analysis) =>
              analysis._id !==
              analysisId
          )
        );

        alert(
          "Analysis deleted successfully"
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete analysis"
      );
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80)
      return "text-green-400";

    if (score >= 60)
      return "text-yellow-400";

    return "text-red-400";
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Analysis History
        </h1>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
          Total Reports: {analyses.length}
        </div>
      </div>

      {loading ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          Loading history...
        </div>
      ) : analyses.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          No analyses found.
        </div>
      ) : (
        <div className="space-y-6">
          {analyses.map((analysis) => (
            <div
              key={analysis._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
                <div>
                  <h2
                    className={`text-4xl font-bold ${getScoreColor(
                      analysis.score
                    )}`}
                  >
                    {analysis.score}%
                  </h2>

                  <p className="text-gray-500">
                    {new Date(
                      analysis.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/analysis/${analysis._id}`}
                    className="bg-zinc-700 hover:bg-zinc-600 px-5 py-3 rounded-xl"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      downloadReport(
                        analysis._id
                      )
                    }
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-5 py-3 rounded-xl"
                  >
                    Download PDF
                  </button>

                  <button
                    onClick={() =>
                      deleteAnalysis(
                        analysis._id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {analysis.strengths &&
                analysis.strengths.length >
                  0 && (
                  <div className="mb-6">
                    <h3 className="text-green-400 font-bold mb-3">
                      Strengths
                    </h3>

                    {analysis.strengths.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="mb-2"
                        >
                          ✓ {item}
                        </div>
                      )
                    )}
                  </div>
                )}

              <div className="mb-6">
                <h3 className="text-yellow-400 font-bold mb-3">
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {(analysis.missingSkills ||
                    []).map(
                    (item, index) => (
                      <span
                        key={index}
                        className="bg-yellow-950 border border-yellow-800 px-3 py-2 rounded-lg"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-blue-400 font-bold mb-3">
                  Suggestions
                </h3>

                {(analysis.suggestions ||
                  []).map(
                  (item, index) => (
                    <div
                      key={index}
                      className="mb-2"
                    >
                      • {item}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}