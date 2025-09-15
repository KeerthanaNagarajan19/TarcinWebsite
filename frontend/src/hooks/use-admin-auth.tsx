// src/hooks/use-admin-auth.ts
import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../hooks/use-toast';

interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'editor';
  profilePicture?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // 🧠 Fetch user using token
  const fetchUserFromToken = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const user = await res.json();
        setUser(user);
      } else {
        logout(); // Invalid token
      }
    } catch (err) {
      console.error('Error validating token:', err);
      logout();
    }
  };

  useEffect(() => {
    fetchUserFromToken().finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
  try {
    setIsLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    let data: any;
    try {
      data = await res.json();
    } catch (jsonError) {
      throw new Error("Login failed: Invalid or empty response from server");
    }

    if (!res.ok) {
      throw new Error(data?.message || "Login failed");
    }

    localStorage.setItem('admin_token', data.token);
    setUser(data.user);

    toast({
      title: 'Logged in successfully',
      description: `Welcome, ${data.user.username}`,
    });

    return true;
  } catch (error: any) {
    toast({
      title: 'Login failed',
      description: error.message || 'Invalid credentials',
      variant: 'destructive',
    });
    return false;
  } finally {
    setIsLoading(false);
  }
};


  // const login = async (username: string, password: string): Promise<boolean> => {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (!res.ok) throw new Error((await res.json()).message || 'Login failed');

  //     const data = await res.json();
  //     localStorage.setItem('admin_token', data.token);
  //     setUser(data.user);

  //     toast({
  //       title: 'Logged in successfully',
  //       description: `Welcome, ${data.user.username}`,
  //     });

  //     return true;
  //   } catch (error: any) {
  //     toast({
  //       title: 'Login failed',
  //       description: error.message || 'Invalid credentials',
  //       variant: 'destructive',
  //     });
  //     return false;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};



// import { createContext, useContext, useState, useEffect } from 'react';
// import { useToast } from '../hooks/use-toast';

// interface AdminUser {
//   id: string;
//   username: string;
//   role: 'admin' | 'editor';
// }

// interface AdminAuthContextType {
//   user: AdminUser | null;
//   isLoading: boolean;
//   login: (username: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

// export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<AdminUser | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();
  
//   useEffect(() => {
//     // Check if there's a saved token and user info in localStorage
//     const token = localStorage.getItem('admin_token');
//     const storedUser = localStorage.getItem('admin_user');
    
//     if (token && storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (err) {
//         console.error('Failed to parse stored user info', err);
//         // Clear invalid data
//         localStorage.removeItem('admin_token');
//         localStorage.removeItem('admin_user');
//       }
//     }
    
//     setIsLoading(false);
//   }, []);
  
// const login = async (username: string, password: string): Promise<boolean> => {
//   try {
//     setIsLoading(true);

//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
        
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Login failed');
//     }

//     const data = await response.json();

//     // Save token and user info in global storage

//     localStorage.setItem('authToken', data.token);
//     localStorage.setItem('authUser', JSON.stringify(data.user));

//     setUser(data.user);

//     toast({
//       title: 'Logged in successfully',
//       description: `Welcome back, ${data.user.username}`,
//     });

//     return true;
//   } catch (error: any) {
//     toast({
//       title: 'Login failed',
//       description: error.message || 'Invalid credentials',
//       variant: 'destructive',
//     });
//     return false;
//   } finally {
//     setIsLoading(false);
//   }
// };

  
//   const logout = () => {
//     localStorage.removeItem('admin_token');
//     localStorage.removeItem('admin_user');
//     setUser(null);
    
//     toast({
//       title: 'Logged out',
//       description: 'You have been logged out successfully',
//     });
//   };
  
//   return (
//     <AdminAuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         login,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AdminAuthContext.Provider>
//   );
// };

// export const useAdminAuth = () => {
//   const context = useContext(AdminAuthContext);
//   if (!context) {
//     throw new Error('useAdminAuth must be used within an AdminAuthProvider');
//   }
//   return context;
// };

// export default useAdminAuth;