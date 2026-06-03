"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../components/DashboardLayout";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchProfile(token);
  }, [router]);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-4xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {user?.name}
            </h2>

            <p className="text-gray-400 text-lg">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-black border border-zinc-800 rounded-xl p-5">
            <p className="text-gray-400 mb-2">
              Account Status
            </p>

            <p className="text-2xl font-bold text-green-400">
              Active
            </p>
          </div>

          <div className="bg-black border border-zinc-800 rounded-xl p-5">
            <p className="text-gray-400 mb-2">
              Email Verified
            </p>

            <p className="text-2xl font-bold">
              Yes
            </p>
          </div>

          <div className="bg-black border border-zinc-800 rounded-xl p-5">
            <p className="text-gray-400 mb-2">
              Membership
            </p>

            <p className="text-2xl font-bold">
              Free
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}