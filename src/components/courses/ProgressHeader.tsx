type ProgressHeaderProps = {
    language: string;
    icon: string;
    description: string;
    completed: number;
    total: number;
  };
  
  function ProgressHeader({
    language,
    icon,
    description,
    completed,
    total,
  }: ProgressHeaderProps) {
    const progress =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);
  
    return (
      <div className="mx-2 mt-4 rounded-2xl border border-blue-700 bg-blue-900/50 p-4 sm:mx-8">
  
        <div className="flex items-center justify-between">
  
          <div className="flex items-center gap-5">
  
            <div className="text-5xl">
              {icon}
            </div>
  
            <div>
  
              <h1 className="text-3xl font-bold text-white">
                {language}
              </h1>
  
              <p className="mt-2 text-slate-400">
                {description}
              </p>
  
            </div>
  
          </div>
  
          <div className="text-right">
  
            <p className="text-sm text-slate-400">
              Progress
            </p>
  
            <h2 className="text-2xl font-bold text-white">
              {progress}%
            </h2>
  
          </div>
  
        </div>
  
        <div className="mt-5">
  
          <div className="mb-2 flex justify-between text-sm text-slate-400">
  
            <span>
              {completed} / {total} lessons completed
            </span>
  
            <span>
              {progress}%
            </span>
  
          </div>
  
          <div className="h-2 overflow-hidden rounded-full bg-white">
  
            <div
              className="h-full rounded-full bg-blue-400 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default ProgressHeader;