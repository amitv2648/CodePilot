import {
    MoonIcon,
    UserCircleIcon,
  } from "@heroicons/react/24/outline";
  
  function Navbar() {
    return (
      <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-8">
  
        <div className="flex items-center gap-3">
  
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
  
            C
  
          </div>
  
          <div>
  
            <h1 className="text-xl font-bold text-white">
              CodePilot
            </h1>
  
            <p className="text-xs text-slate-400">
              Personalized Coding Education
            </p>
  
          </div>
  
        </div>
  
        <div className="flex items-center gap-4">
  
          <button className="p-2 rounded-lg hover:bg-slate-800 transition">
  
            <MoonIcon className="w-6 h-6 text-slate-300" />
  
          </button>
  
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition">
  
            <UserCircleIcon className="w-8 h-8 text-slate-300" />
  
            <span className="text-white">
              Profile
            </span>
  
          </button>
  
        </div>
  
      </header>
    );
  }
  
  export default Navbar;