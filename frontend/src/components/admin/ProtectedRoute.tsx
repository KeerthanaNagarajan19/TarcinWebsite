import React, { ReactNode } from 'react';
import { useLocation, Route, Redirect } from 'wouter';
import { useAdminAuth } from '../../hooks/use-admin-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  path: string;
  children: ReactNode;
}

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * Use this for any admin routes that require authentication
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  path, 
  children 
}) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  
  return (
    <Route path={path}>
      {() => {
        // Show loading state while checking authentication
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-md">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-600">Verifying authentication...</p>
              </div>
            </div>
          );
        }
        
        // Redirect to login page if not authenticated
        if (!isAuthenticated) {
          return <Redirect to="/admin/login" />;
        }
        
        // Render children if authenticated
        return <>{children}</>;
      }}
    </Route>
  );
};

export default ProtectedRoute;