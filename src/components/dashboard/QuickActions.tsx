import {
    SparklesIcon,
    AcademicCapIcon,
    CodeBracketIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/outline";
  
  function QuickActions() {
    const actions = [
      {
        title: "Ask AI Tutor",
        description: "Get instant coding help",
        icon: <SparklesIcon className="h-6 w-6" />,
      },
      {
        title: "Continue Lesson",
        description: "Resume where you left off",
        icon: <AcademicCapIcon className="h-6 w-6" />,
      },
      {
        title: "Open Code Editor",
        description: "Practice coding",
        icon: <CodeBracketIcon className="h-6 w-6" />,
      },
      {
        title: "Settings",
        description: "Customize CodePilot",
        icon: <Cog6ToothIcon className="h-6 w-6" />,
      },
    ];
  
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
  
        <h2 className="mb-6 text-xl font-semibold text-white">
          Quick Actions
        </h2>
  
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  
          {actions.map((action) => (
  
            <button
              key={action.title}
              className="rounded-xl border border-slate-700 bg-slate-800 p-5 text-left transition-all hover:border-blue-500 hover:-translate-y-1"
            >
  
              <div className="mb-4 text-blue-400">
                {action.icon}
              </div>
  
              <h3 className="font-semibold text-white">
                {action.title}
              </h3>
  
              <p className="mt-2 text-sm text-slate-400">
                {action.description}
              </p>
  
            </button>
  
          ))}
  
        </div>
  
      </div>
    );
  }
  
  export default QuickActions;