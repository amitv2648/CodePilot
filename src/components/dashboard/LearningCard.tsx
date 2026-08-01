import { useNavigate } from "react-router-dom";

type LearningCardProps = {
  language: string;
  level: string;
  progress: number;
  icon: string;
};

function LearningCard({
  language,
  level,
  progress,
  icon,
}: LearningCardProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">
            {icon}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {language}
            </h3>

            <p className="text-sm text-slate-400">
              {level}
            </p>
          </div>

        </div>

        <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
          {level}
        </span>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm text-slate-400">

          <span>Progress</span>

          <span>{progress}%</span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />

        </div>

      </div>

      <button
        onClick={() =>
          navigate(`/course/${encodeURIComponent(language)}`)
        }
        className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        Continue Learning →
      </button>

    </div>
  );
}

export default LearningCard;