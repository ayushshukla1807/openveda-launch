import { Sidebar } from '../../components/opensource/Sidebar';
import { ProgressWidget } from '../../components/opensource/ProgressWidget';

export default function OpenSourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0f1115] min-h-screen text-gray-300 selection:bg-orange-500/30 selection:text-orange-200">
      {/* Sidebar - hidden on mobile, fixed left */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Navbar for mobile (optional placeholder for now) */}
        <div className="md:hidden p-4 border-b border-[#2a2d36] flex items-center justify-between">
          <span className="font-bold text-white">Hacktoberfest 2026</span>
          {/* Mobile menu toggle would go here */}
        </div>

        {/* Page Content */}
        <div className="flex-1 relative">
          {children}
        </div>
      </main>

      {/* Floating Progress Widget */}
      <ProgressWidget />
    </div>
  );
}
