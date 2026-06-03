"use client";

import Link from "next/link";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

export default function DashboardLayout({
  children,
}) {
  const [showMenu, setShowMenu] =
    useState(false);

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  const [user, setUser] =
    useState(null);

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const router = useRouter();

  const pathname = usePathname();

  const menuRef = useRef(null);

  const notificationRef =
    useRef(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    fetchUser(token);

    fetchNotifications(token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {
        setShowMenu(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotifications =
    async (token) => {
      try {
        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/notifications`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (response.ok) {
          setNotifications(
            data.notifications
          );

          setUnreadCount(
            data.unreadCount
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },

    {
      name: "Analyze Resume",
      href: "/analyze",
    },

    {
      name: "History",
      href: "/history",
    },

    {
      name: "Compare Resumes",
      href: "/compare",
    },

    {
      name: "AI Resume Rewriter",
      href: "/rewrite",
    },

    {
      name: "Job Match Engine",
      href: "/jobs",
    },

    {
      name: "AI Interview Prep",
      href: "/interview",
    },

    {
      name: "Profile",
      href: "/profile",
    },

    {
      name: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white flex">
      <aside className="w-72 bg-gradient-to-b from-zinc-950 to-zinc-900 border-r border-white/10 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            ResumeAI
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            AI Career Assistant Platform
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
          <p className="text-sm text-gray-400 mb-2">
            Logged in as
          </p>

          <p className="font-semibold">
            {user?.name || "User"}
          </p>

          <p className="text-xs text-gray-500 truncate">
            {user?.email}
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-20 border-b border-white/10 bg-black/30 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome Back
            </h2>

            <p className="text-gray-500 text-sm">
              Manage your AI career tools
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div
              className="relative"
              ref={notificationRef}
            >
              <button
                onClick={() =>
                  setShowNotifications(
                    !showNotifications
                  )
                }
                className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-lg"
              >
                🔔
              </button>

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}

              {showNotifications && (
                <div className="absolute right-0 mt-4 w-96 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="p-5 border-b border-white/10">
                    <h3 className="font-bold text-lg">
                      Notifications
                    </h3>
                  </div>

                  {notifications.length ===
                  0 ? (
                    <div className="p-5 text-gray-400">
                      No notifications available.
                    </div>
                  ) : (
                    notifications.map(
                      (item) => (
                        <div
                          key={item._id}
                          className="p-5 border-b border-white/10 hover:bg-white/5 transition-all duration-300"
                        >
                          <p className="font-semibold mb-1">
                            {item.title}
                          </p>

                          <p className="text-sm text-gray-400">
                            {item.message}
                          </p>
                        </div>
                      )
                    )
                  )}
                </div>
              )}
            </div>

            <div
              className="relative"
              ref={menuRef}
            >
              <button
                onClick={() =>
                  setShowMenu(
                    !showMenu
                  )
                }
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-bold text-lg shadow-lg shadow-blue-500/20"
              >
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-4 w-60 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="px-5 py-4 border-b border-white/10">
                    <p className="font-semibold">
                      {user?.name}
                    </p>

                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-5 py-4 hover:bg-white/5 transition-all duration-300"
                  >
                    My Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="block px-5 py-4 hover:bg-white/5 transition-all duration-300"
                  >
                    Settings
                  </Link>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full text-left px-5 py-4 hover:bg-white/5 transition-all duration-300 text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 bg-gradient-to-br from-black via-zinc-950 to-black">
          {children}
        </main>
      </div>
    </div>
  );
}