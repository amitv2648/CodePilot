import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8 overflow-auto">

          {children}

        </main>

      </div>

    </div>
  );
}

export default Layout;