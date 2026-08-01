import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsCard from "../../components/dashboard/StatsCard";
import QuickActions from "../../components/dashboard/QuickActions";
import LearningCard from "../../components/dashboard/LearningCard";
import RecentSessions from "../../components/dashboard/RecentSessions";

function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Languages"
          value="0"
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

      {/* Quick Actions */}
      <QuickActions />

      {/* Continue Learning */}
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

          <LearningCard
            language="Python"
            level="Beginner"
            progress={0}
            icon="🐍"
          />

          <LearningCard
            language="Java"
            level="Beginner"
            progress={0}
            icon="☕"
          />

          <LearningCard
            language="C++"
            level="Beginner"
            progress={0}
            icon="⚙️"
          />

        </div>

      </section>

      {/* Recent Sessions */}
      <RecentSessions />

    </div>
  );
}

export default Dashboard;