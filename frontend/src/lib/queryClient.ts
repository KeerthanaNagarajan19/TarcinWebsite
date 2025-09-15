import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  url: string,
  options: RequestInit = {},
): Promise<any> {
  // Get admin token from localStorage
  const token = localStorage.getItem('admin_token');
  
  // Prepare headers with token if available
  const headers = {
    ...options.headers,
  } as Record<string, string>;

  if (options.headers?.['Content-Type'] !== undefined) {
    headers['Content-Type'] = options.headers['Content-Type'];
  } else if (options.headers?.['Content-Type'] === undefined) {
    // allow browser to set content-type for FormData
    delete headers['Content-Type'];
  }
  else {
    headers['Content-Type'] = 'application/json';
  }
  
  // Add Authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  // Ensure URL is absolute for localhost development
  const apiUrl = url.startsWith('/api') ? `${url}` : url;
  console.log("API URL",apiUrl);
  
  const res = await fetch(apiUrl, {
    ...options,
    headers,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res.json().catch(() => res);
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Get token from localStorage
    const token = localStorage.getItem('admin_token');
    
    // Prepare headers
    const headers = {
      "Content-Type": "application/json",
    } as Record<string, string>;
    
    // Add Authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    // Ensure URL is absolute for localhost development
    const url = queryKey[0] as string;
    const apiUrl = url.startsWith('/api') ? `${url}` : url;
    
    const res = await fetch(apiUrl, {
      credentials: "include",
      headers
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
