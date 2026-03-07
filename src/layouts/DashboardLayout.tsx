// ============================================
// URBAN GRAVITY - DASHBOARD LAYOUT
// ============================================

import { useState, type ReactNode } from "react";
import { Sidebar } from "./navigation/Sidebar";
import { Header } from "./navigation/Header";
import { cn } from "@/utils/cn";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Collapsed by default
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Top Nav - Occupies full width */}
      <Header
        onMenuClick={() => setMobileSidebarOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Below Header */}
        <Sidebar
          collapsed={sidebarCollapsed}
          locked={sidebarLocked}
          onToggle={() => setSidebarLocked(!sidebarLocked)} // Now toggles lock
          onHoverChange={(isHovering) => {
            if (!sidebarLocked) {
              setSidebarCollapsed(!isHovering);
            }
          }}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Container */}
        <div className="flex flex-1 flex-col overflow-hidden relative">
          {/* Decorative background element for premium feel */}
          <div className="absolute top-0 right-0 h-96 w-96 bg-primary-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          {/* Scrollable Page Content */}
          <main
            className={cn(
              "flex-1 overflow-y-auto px-6 py-8 lg:px-10 lg:py-10 scroll-smooth custom-scrollbar relative z-10",
              "transition-all duration-300 bg-mesh",
            )}
          >
            <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>

            {/* Subtle footer in dashboard content */}
            <footer className="mt-12 py-8 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <p>© 2026 Urban Gravity Platform • Lagos, Nigeria</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-primary-600 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-primary-600 transition-colors">
                  Security Audit
                </a>
              </div>
            </footer>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay with premium blur */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-sidebar/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 animate-fade-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}
