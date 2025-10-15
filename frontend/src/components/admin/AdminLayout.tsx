import React from "react";
import { useLocation } from "wouter";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Settings, FileText, Calendar, Briefcase, Users, LayoutDashboard, Notebook, Mail,Image } from "lucide-react";
import { useAdminAuth } from "../../hooks/use-admin-auth";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const { user, logout, isAuthenticated, isLoading } = useAdminAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Redirect handled by the hook
    return null;
  }

  // Navigation items
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/courses', label: 'Courses', icon: Notebook },
    { path: '/admin/blog', label: 'Blog Posts', icon: FileText },
    { path: '/admin/events', label: 'Events', icon: Calendar },
    { path: '/admin/careers', label: 'Careers', icon: Briefcase },
    { path: '/admin/community', label: 'Community Stories', icon: Users },
    { path: "/admin/gallery", label: "Gallery", icon: Image },
    { path: '/admin/newsletter-subscribers', label: 'Newsletter', icon: Mail },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col h-screen">
        {/* Fixed header and user info */}
        <div className="flex flex-col flex-shrink-0">
          <div className="flex items-center justify-center h-16 border-b border-blue-800">
            <h1 className="text-xl font-bold">Tarcin Admin</h1>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 bg-blue-700">
                <AvatarImage src={user.profilePicture} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-xs text-blue-300">{user.role}</p>
              </div>
            </div>
          </div>
          <Separator className="bg-blue-800 my-2" />
        </div>
        {/* Scrollable nav */}
        <nav
          className="flex-1 overflow-y-auto p-2 custom-scrollbar"
          style={{ minHeight: 0 }}
        >
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    location === item.path
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Fixed logout button */}
        <div className="p-4 border-t border-blue-800 flex-shrink-0">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-200 hover:text-white hover:bg-blue-800"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
            <Avatar className="h-10 w-10 bg-blue-700">
              <AvatarImage src={user.profilePicture} alt={user.username} />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

// Add this to your global CSS (e.g., index.css or tailwind.css):
/*

*/