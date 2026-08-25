"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      window.location.href = "/";
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">
          Welcome, {user.name}! 👋
        </h1>

        <p className="mb-6 text-gray-600">
          You are successfully logged in.
        </p>

        <p className="mb-6">
          {user.email}
        </p>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-black px-6 py-3 font-semibold text-white"
        >
          Logout
        </button>
      </div>
    </main>
  );
}