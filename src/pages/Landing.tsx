import {
  AcademicCapIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  MicrophoneIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const features = [
  {
    title: "Voice-first tutoring",
    description:
      "Speak naturally with a tutor that explains concepts, listens to your questions, and guides each lesson.",
    icon: MicrophoneIcon,
  },
  {
    title: "Learn by coding",
    description:
      "Practice directly in a VS Code-powered editor and run Python without leaving your learning session.",
    icon: CodeBracketIcon,
  },
  {
    title: "Personalized lessons",
    description:
      "Your tutor follows the active lesson, challenge, progress, conversation, and the code you are writing.",
    icon: AcademicCapIcon,
  },
];

const learningSteps = [
  "Choose the programming language you want to learn.",
  "Follow focused lessons with examples and challenges.",
  "Start a voice session and code alongside your tutor.",
];

function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
            aria-label="CodePilot home"
          >
            <img
              src="/codepilot-logo.svg"
              alt=""
              className="h-12 w-16 object-contain"
            />
            <span className="text-xl font-bold">CodePilot</span>
          </button>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition hover:text-white"
            >
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {!user && (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Log in
              </button>
            )}

            <button
              type="button"
              onClick={() =>
                navigate(user ? "/dashboard" : "/signup")
              }
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {user ? "Dashboard" : "Start learning"}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                <SparklesIcon className="h-4 w-4" />
                Voice-first coding education
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Learn to code with a tutor that{" "}
                <span className="text-blue-400">
                  speaks your language.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                CodePilot combines spoken tutoring, focused lessons, and
                an interactive coding workspace to make programming feel
                personal and approachable.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    navigate(user ? "/dashboard" : "/signup")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-500"
                >
                  {user ? "Continue learning" : "Create free account"}
                  <ArrowRightIcon className="h-5 w-5" />
                </button>

                {!user && (
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-slate-300 transition hover:bg-slate-900 hover:text-white"
                  >
                    I already have an account
                  </button>
                )}
              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                {[
                  "Free to start",
                  "Learn at your pace",
                  "No setup required",
                ].map((benefit) => (
                  <span
                    key={benefit}
                    className="flex items-center gap-2"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-blue-400" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-4 shadow-2xl shadow-blue-950/40">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Python · Variables
                    </p>
                    <p className="mt-1 font-semibold">
                      Live learning session
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-300">
                    Voice Tutor Active
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                    <p className="text-xs font-semibold text-blue-400">
                      LIVE TRANSCRIPT
                    </p>
                    <div className="mt-4 space-y-3 text-xs leading-5 text-slate-300">
                      <p className="rounded-lg bg-blue-500/10 p-2">
                        Let&apos;s create a variable together.
                      </p>
                      <p className="ml-5 rounded-lg bg-slate-800 p-2 text-right">
                        Should I use a number?
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                    <p className="text-xs font-semibold text-blue-400">
                      AI WHITEBOARD
                    </p>
                    <p className="mt-4 text-sm font-semibold">
                      Variables store values
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Give information a name, then reuse it throughout
                      your program.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                    <p className="text-xs font-semibold text-blue-400">
                      CODE
                    </p>
                    <pre className="mt-4 overflow-hidden text-xs leading-5 text-green-400">
{`age = 18
print(age)`}
                    </pre>
                    <div className="mt-4 rounded-lg bg-blue-600 py-2 text-center text-xs font-semibold">
                      Run Code
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-3 text-sm text-blue-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                  Listening to your question...
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-y border-slate-800 bg-slate-900/50 py-24"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Everything in one place
              </p>
              <h2 className="mt-3 text-4xl font-bold">
                A complete learning workspace
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Learn the concept, discuss it, write the code, and see
                the result without switching tools.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                How it works
              </p>
              <h2 className="mt-3 text-4xl font-bold">
                From your first lesson to working code
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {learningSteps.map((step, index) => (
                <div key={step} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-lg font-bold text-blue-300">
                    {index + 1}
                  </div>
                  <p className="mt-5 leading-7 text-slate-300">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-blue-500/30 bg-blue-600/10 px-8 py-14 text-center">
            <h2 className="text-4xl font-bold">
              Ready to start your coding journey?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Build confidence one conversation, lesson, and program at
              a time.
            </p>
            <button
              type="button"
              onClick={() =>
                navigate(user ? "/dashboard" : "/signup")
              }
              className="mt-8 rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition hover:bg-blue-500"
            >
              {user ? "Open dashboard" : "Start learning for free"}
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2">
            <img
              src="/codepilot-logo.svg"
              alt=""
              className="h-8 w-10 object-contain"
            />
            <span className="font-semibold text-slate-300">
              CodePilot
            </span>
          </div>
          <p>Voice-first coding education, built for every learner.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;