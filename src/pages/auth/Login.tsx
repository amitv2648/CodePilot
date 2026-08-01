import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import AuthLayout from "../../layouts/AuthLayout";

import {
  login,
  googleLogin,
} from "../../services/firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  }

  async function handleGoogleLogin() {
    try {
      await googleLogin();
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed.");
    }
  }

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Continue your coding journey."
    >
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-300">
              Password
            </label>

            <button
              type="button"
              onClick={() =>
                navigate("/forgot-password")
              }
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot Password?
            </button>
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Sign In

          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </form>

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-slate-700" />

        <span className="px-4 text-sm text-slate-500">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-700" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 font-medium text-white transition hover:border-blue-500 hover:bg-slate-700"
      >
        Continue with Google
      </button>

      <p className="mt-8 text-center text-slate-400">
        Don't have an account?{" "}
        <button
          onClick={() =>
            navigate("/signup")
          }
          className="font-semibold text-blue-400 hover:text-blue-300"
        >
          Create one
        </button>
      </p>
    </AuthLayout>
  );
}

export default Login;