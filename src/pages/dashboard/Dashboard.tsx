import { useEffect, useState } from "react";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsCard from "../../components/dashboard/StatsCard";
import QuickActions from "../../components/dashboard/QuickActions";
import LearningCard from "../../components/dashboard/LearningCard";
import RecentSessions from "../../components/dashboard/RecentSessions";

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

function Dashboard() {
  const { user } = useAuth();

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!user) {
        setLoading(false);
        return;
      }

      const data =
        await getUserProfile(user.uid);

      if (data) {
        setProfile(data as UserProfile);
      }

      setLoading(false);
    }

    loadUser();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-20">
        Loading Dashboard...
      </div>
    );
  }

  const languages =
    profile?.languages ?? [];

  return (
    <div className="space-y-8">

      <WelcomeBanner
        firstName={profile?.firstName ?? ""}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Languages"
          value={languages.length.toString()}
          subtitle="Languages selected"
        />

        <StatsCard
          title="Overall Progress"
          value="0%"
          subtitle="Learning completion"
        />

        <StatsCard
          title="Sessions"
          value="0"
          subtitle="Coding sessions completed"
        />

        <StatsCard
          title="Current Streak"
          value="🔥 0"
          subtitle="Consecutive learning days"
        />

      </div>

      <QuickActions />

      <section>

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Continue Learning
          </h2>

          <button className="text-blue-400 hover:text-blue-300">
            View All →
          </button>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {languages.map((language) => (

            <LearningCard
              key={language}
              language={language}
              level="Beginner"
              progress={0}
              icon={
                languageIcons[language] ??
                "💻"
              }
            />

          ))}

        </div>

      </section>

      <RecentSessions />

    </div>
  );
}

export default Dashboard;