import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">

      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* Left Side */}

        <div className="hidden lg:flex w-1/2 flex-col justify-center px-16">

          <h1 className="text-6xl font-extrabold text-white">
            CodePilot
          </h1>

          <p className="mt-6 text-2xl text-slate-300">
            Learn programming with your personal AI mentor.
          </p>

          <div className="mt-12 space-y-6 text-lg">

            <div className="flex gap-4">
              <span>🤖</span>
              <span className="text-slate-300">
                Personalized AI Roadmaps
              </span>
            </div>

            <div className="flex gap-4">
              <span>💻</span>
              <span className="text-slate-300">
                Interactive Coding Workspace
              </span>
            </div>

            <div className="flex gap-4">
              <span>📚</span>
              <span className="text-slate-300">
                Project-Based Learning
              </span>
            </div>

            <div className="flex gap-4">
              <span>⚡</span>
              <span className="text-slate-300">
                Instant AI Tutor
              </span>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex w-full items-center justify-center lg:w-1/2 p-8">

          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-10 shadow-xl">

            <h2 className="text-3xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-2 mb-8 text-slate-400">
              {subtitle}
            </p>

            {children}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;