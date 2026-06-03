import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <section className="flex-1 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-6">
          AI Resume Analyzer
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl">
          Upload your resume, compare it against job descriptions,
          and receive AI-powered feedback to improve your chances
          of landing interviews.
        </p>

        <Link
          href="/login"
          className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </main>
  );
}