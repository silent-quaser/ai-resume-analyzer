"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "../../components/DashboardLayout";

export default function AnalyzePage() {
  const router = useRouter();

  const [resumeText, setResumeText] =
    useState("");

  const [
    jobDescription,
    setJobDescription,
  ] = useState("");

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleFileUpload =
    async () => {
      if (!selectedFile) {
        alert(
          "Please select a PDF file"
        );

        return;
      }

      try {
        setUploading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "resume",
          selectedFile
        );

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/upload/resume`,
            {
              method: "POST",

              headers: {
                Authorization: `Bearer ${token}`,
              },

              body: formData,
            }
          );

        const data =
          await response.json();

        if (response.ok) {
          setResumeText(
            data.extractedText
          );

          alert(
            "Resume uploaded successfully"
          );
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);

        alert("Upload failed");
      } finally {
        setUploading(false);
      }
    };

  const handleAnalyze =
    async () => {
      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/analysis/analyze`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                resumeText,
                jobDescription,
              }),
            }
          );

        const data =
          await response.json();

        if (response.ok) {
          setAnalysis(
            data.analysis
          );
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);

        alert(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Resume Analyzer
      </h1>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Upload Resume PDF
        </h2>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-6 py-3 rounded-xl font-semibold w-fit">
            Choose PDF

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setSelectedFile(
                  e.target.files[0]
                )
              }
              className="hidden"
            />
          </label>

          <p className="text-gray-400 truncate">
            {selectedFile
              ? selectedFile.name
              : "No file selected"}
          </p>

          <button
            onClick={
              handleFileUpload
            }
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
          >
            {uploading
              ? "Uploading..."
              : "Upload PDF"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
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
            className="w-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Job Description
          </label>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
            rows={12}
            className="w-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-6 py-3 rounded-xl font-semibold"
      >
        {loading
          ? "Analyzing..."
          : "Analyze Resume"}
      </button>

      {analysis && (
        <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Analysis Result
          </h2>

          <p className="mb-4">
            <strong>Score:</strong>{" "}
            {analysis.score}%
          </p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">
              Missing Skills
            </h3>

            <ul className="list-disc ml-6">
              {analysis.missingSkills?.map(
                (
                  skill,
                  index
                ) => (
                  <li key={index}>
                    {skill}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Suggestions
            </h3>

            <ul className="list-disc ml-6">
              {analysis.suggestions?.map(
                (
                  suggestion,
                  index
                ) => (
                  <li key={index}>
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}