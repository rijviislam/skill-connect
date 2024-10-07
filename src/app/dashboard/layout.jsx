

import DashboardSideBar from "./DashboardSideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div>
        <DashboardSideBar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-4">
        
        {children}
        
      </div>

     
    </div>
  );
}
