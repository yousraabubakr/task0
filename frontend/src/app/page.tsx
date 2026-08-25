"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const endpoint = isLogin
      ? "http://localhost:3001/auth/login"
      : "http://localhost:3001/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: isLogin
          ? JSON.stringify({
              email,
              password,
            })
          : JSON.stringify({
              name,
              email,
              password,
            }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Login successful!");

        window.location.href = "/home";
      } else {
        setMessage("Registration successful! You can now log in.");

        setName("");
        setEmail("");
        setPassword("");

        setIsLogin(true);
      }
    } catch {
      setError("Could not connect to the server.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {isLogin ? "Login" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1 block font-medium">Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border p-3"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border p-3"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg border p-3"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black p-3 font-semibold text-white"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600">{error}</p>
        )}

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
            setError("");
          }}
          className="mt-6 w-full text-center text-sm underline"
        >
          <a
            href="/forgot-password"
            className="mt-4 block text-center text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </main>
  );
}