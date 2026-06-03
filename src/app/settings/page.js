"use client";

import DashboardLayout from "../../components/DashboardLayout";

export default function SettingsPage() {
  const handleDeleteAccount =
    async () => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to permanently delete your account?"
        );

      if (!confirmDelete) return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete-account`,
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
          alert(
            "Account deleted successfully"
          );

          localStorage.removeItem(
            "token"
          );

          window.location.href =
            "/login";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);

        alert("Delete failed");
      }
    };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="space-y-6 max-w-4xl">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4">
            Account Settings
          </h2>

          <p className="text-gray-400">
            Manage your account
            preferences and profile
            information.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4">
            Profile Information
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 outline-none"
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4">
            Security
          </h3>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 outline-none"
            />
          </div>
        </div>

        <div className="bg-zinc-900 border border-red-900 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-3">
            Danger Zone
          </h3>

          <p className="text-gray-400 mb-4">
            Permanently delete your
            account and all associated
            data.
          </p>

          <button
            type="button"
            onClick={
              handleDeleteAccount
            }
            className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
          >
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}