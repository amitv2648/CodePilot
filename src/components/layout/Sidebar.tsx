import {
    HomeIcon,
    AcademicCapIcon,
    CommandLineIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/outline";
  
  function Sidebar() {
    return (
      <aside className="w-64 min-h-[calc(100vh-64px)] bg-slate-900 border-r border-slate-700">
  
        <nav className="flex flex-col gap-2 p-4">
  
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 bg-slate-800 text-white font-medium transition hover:bg-slate-700">
  
            <HomeIcon className="h-6 w-6" />
  
            Dashboard
  
          </button>
  
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
  
            <AcademicCapIcon className="h-6 w-6" />
  
            Learning Paths
  
          </button>
  
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
  
            <CommandLineIcon className="h-6 w-6" />
  
            Sessions
  
          </button>
  
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
  
            <Cog6ToothIcon className="h-6 w-6" />
  
            Settings
  
          </button>
  
        </nav>
  
      </aside>
    );
  }
  
  export default Sidebar;