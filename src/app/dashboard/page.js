"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import DashboardLayout from "../../components/DashboardLayout";

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
    totalAnalyses: 0,
    averageScore: 0,
    latestAnalysis: null,
  });

  const [chartData, setChartData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchStats(token);
    fetchHistory(token);
  }, [router]);

  const fetchStats = async (token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analysis/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHistory = async (
    token
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analysis/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        const formatted =
          data.analyses
            .slice()
            .reverse()
            .map(
              (
                analysis,
                index
              ) => ({
                name: `#${index + 1}`,
                score:
                  analysis.score,
              })
            );

        setChartData(formatted);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (
    score
  ) => {
    if (score >= 80)
      return "text-green-400";

    if (score >= 60)
      return "text-yellow-400";

    return "text-red-400";
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back to your ATS Resume Analyzer.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <p className="text-gray-400 mb-2">
                Total Analyses
              </p>

              <h2 className="text-5xl font-bold">
                {stats.totalAnalyses}
              </h2>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <p className="text-gray-400 mb-2">
                Average Score
              </p>

              <h2
                className={`text-5xl font-bold ${getScoreColor(
                  stats.averageScore
                )}`}
              >
                {stats.averageScore}%
              </h2>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <p className="text-gray-400 mb-2">
                Latest Score
              </p>

              <h2
                className={`text-5xl font-bold ${getScoreColor(
                  stats.latestAnalysis
                    ?.score || 0
                )}`}
              >
                {stats.latestAnalysis
                  ? `${stats.latestAnalysis.score}%`
                  : "N/A"}
              </h2>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <p className="text-gray-400 mb-2">
                ATS Status
              </p>

              <h2 className="text-2xl font-bold">
                {stats.averageScore >=
                80
                  ? "Excellent"
                  : stats.averageScore >=
                    60
                  ? "Good"
                  : "Needs Work"}
              </h2>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 mb-10">
            <h2 className="text-2xl font-bold mb-6">
              ATS Score Trend
            </h2>

            {chartData.length > 0 ? (
              <div className="h-[350px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={chartData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-400">
                No chart data available.
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4">
                Latest Analysis
              </h2>

              {stats.latestAnalysis ? (
                <>
                  <div
                    className={`text-6xl font-bold mb-4 ${getScoreColor(
                      stats
                        .latestAnalysis
                        .score
                    )}`}
                  >
                    {
                      stats
                        .latestAnalysis
                        .score
                    }
                    %
                  </div>

                  <p className="text-gray-400 mb-2">
                    Completed on:
                  </p>

                  <p>
                    {new Date(
                      stats
                        .latestAnalysis
                        .createdAt
                    ).toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-gray-400">
                  No analysis available.
                </p>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    router.push(
                      "/analyze"
                    )
                  }
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-4 py-3 rounded-xl"
                >
                  Analyze New Resume
                </button>

                <button
                  onClick={() =>
                    router.push(
                      "/history"
                    )
                  }
                  className="w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-xl"
                >
                  View History
                </button>

                <button
                  onClick={() =>
                    router.push(
                      "/jobs"
                    )
                  }
                  className="w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-xl"
                >
                  Job Match Engine
                </button>

                <button
                  onClick={() =>
                    router.push(
                      "/rewrite"
                    )
                  }
                  className="w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-xl"
                >
                  AI Resume Rewriter
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}