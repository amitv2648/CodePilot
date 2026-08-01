import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import AuthLayout from "../../layouts/AuthLayout";

import {
  signup,
  googleLogin,
} from "../../services/firebase/auth";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signup(email, password);

      navigate("/profile-setup");
    } catch (err) {
      setError("Unable to create your account.");
    }
  }

  async function handleGoogleSignup() {
    try {
      await googleLogin();

      navigate("/profile-setup");
    } catch (err) {
      setError("Google signup failed.");
    }
  }

  return (
    <AuthLayout
      title="Create Your Account 🚀"
      subtitle="Start your personalized coding journey."
    >
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSignup}
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
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Create Account

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
        onClick={handleGoogleSignup}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 font-medium text-white transition hover:border-blue-500 hover:bg-slate-700"
      >
        Continue with Google
      </button>

      <p className="mt-8 text-center text-slate-400">
        Already have an account?{" "}
        <button
          onClick={() =>
            navigate("/login")
          }
          className="font-semibold text-blue-400 hover:text-blue-300"
        >
          Sign In
        </button>
      </p>
    </AuthLayout>
  );
}

export default Signup;