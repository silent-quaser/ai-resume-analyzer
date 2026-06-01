export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
        <h1 className="text-3xl font-bold text-white mb-6">
          Register
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-semibold"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}