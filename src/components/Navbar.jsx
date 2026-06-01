import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-white"
        >
          AI Resume Analyzer
        </Link>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}