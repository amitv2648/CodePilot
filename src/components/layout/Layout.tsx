import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({
  children,
  showSidebar = true,
}: {
  children: React.ReactNode;
  showSidebar?: boolean;
}) {
  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="flex">

        {showSidebar && <Sidebar />}

        <main className="flex-1 overflow-auto px-8 pb-8 pt-12">

          {children}

        </main>

      </div>

    </div>
  );
}

export default Layout;