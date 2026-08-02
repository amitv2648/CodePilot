import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { courses } from "../../data/courses";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../services/firebase/user";

import type { UserProfile } from "../../types/user";

const languageIcons: Record<string, string> = {
  Python: "🐍",
  Java: "☕",
  "C++": "⚙️",
  JavaScript: "🟨",
  TypeScript: "🔷",
  HTML: "🌐",
  CSS: "🎨",
  React: "⚛️",
  R: "📊",
  Julia: "🟣",
};

function LearningPaths() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setLoading(false);
        return;
      }

      const data = await getUserProfile(user.uid);
      if (data) {
        setProfile(data as UserProfile);
      }
      setLoading(false);
    }

    void loadProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading learning paths...
      </div>
    );
  }

  const languages = profile?.languages ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Learning Paths
        </h1>
        <p className="mt-2 text-slate-400">
          Browse the programming languages you selected during onboarding.
        </p>
      </div>

      {languages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
          <p className="text-lg font-semibold text-white">
            No learning paths yet
          </p>
          <p className="mt-2 text-slate-400">
            Complete onboarding to choose the languages you want to learn.
          </p>
          <button
            type="button"
            onClick={() => navigate("/onboarding")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Choose languages
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {languages.map((language) => {
            const course = courses[language];
            const icon = languageIcons[language] ?? "💻";
            const lessonCount = course?.lessons.length ?? 0;
            const completed =
              course?.lessons.filter((lesson) => lesson.completed)
                .length ?? 0;
            const progress =
              lessonCount === 0
                ? 0
                : Math.round((completed / lessonCount) * 100);

            return (
              <div
                key={language}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                    {icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {language}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {course
                        ? `${lessonCount} lessons`
                        : "Path coming soon"}
                    </p>
                  </div>
                </div>

                {course ? (
                  <>
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {course.description}
                    </p>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-sm text-slate-400">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/course/${encodeURIComponent(language)}`,
                        )
                      }
                      className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
                    >
                      Open course →
                    </button>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-slate-400">
                    This language is on your list, but lessons are not
                    available yet.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LearningPaths;
