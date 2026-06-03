"use client";

import { useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

export default function RewritePage() {
  const [resumeText, setResumeText] =
    useState("");

  const [
    improvedResume,
    setImprovedResume,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const handleFileUpload =
    async (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      setSelectedFile(file);

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
          file
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
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);

        alert(
          "Failed to upload PDF"
        );
      } finally {
        setUploading(false);
      }
    };

  const handleRewrite =
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/resume/rewrite`,
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
          setImprovedResume(
            data.improvedResume
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

  const copyToClipboard =
    () => {
      navigator.clipboard.writeText(
        improvedResume
      );

      alert(
        "Improved resume copied to clipboard"
      );
    };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        AI Resume Rewriter
      </h1>

      <div className="mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <label className="block mb-4 font-semibold text-xl">
          Upload Resume PDF
        </label>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-6 py-3 rounded-xl font-semibold w-fit">
            Choose PDF

            <input
              type="file"
              accept=".pdf"
              onChange={
                handleFileUpload
              }
              className="hidden"
            />
          </label>

          <p className="text-gray-400 truncate">
            {selectedFile
              ? selectedFile.name
              : "No file selected"}
          </p>
        </div>

        {uploading && (
          <p className="mt-4 text-blue-400">
            Extracting PDF text...
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold">
            Original Resume
          </label>

          <textarea
            value={resumeText}
            onChange={(e) =>
              setResumeText(
                e.target.value
              )
            }
            rows={18}
            className="w-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 outline-none"
            placeholder="Paste resume or upload PDF..."
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Improved Resume
          </label>

          <textarea
            value={improvedResume}
            readOnly
            rows={18}
            className="w-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 outline-none"
            placeholder="Improved resume will appear here..."
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleRewrite}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-6 py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Rewriting..."
            : "Rewrite Resume"}
        </button>

        {improvedResume && (
          <button
            onClick={
              copyToClipboard
            }
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
          >
            Copy Result
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}