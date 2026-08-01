function RecentSessions() {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
  
        <div className="flex items-center justify-between mb-6">
  
          <h2 className="text-xl font-semibold text-white">
            Recent Sessions
          </h2>
  
          <button className="text-blue-400 hover:text-blue-300">
            View History →
          </button>
  
        </div>
  
        <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">
  
          <div className="text-5xl mb-4">
            💻
          </div>
  
          <h3 className="text-lg font-semibold text-white">
            No sessions yet
          </h3>
  
          <p className="mt-2 text-slate-400">
            Start your first lesson and your recent coding sessions will appear here.
          </p>
  
        </div>
  
      </div>
    );
  }
  
  export default RecentSessions;