import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { resolveMockRequest } from "./mockData";

// Toggle this to switch between real backend and dummy backend
const USE_MOCK_API = false;

// Global Interceptor to handle native fetch() used in various components
if (USE_MOCK_API && typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
    const mockRes = resolveMockRequest(url);
    if (mockRes) {
      console.log(`[Global Mock] Intercepted native fetch: ${url}`);
      return new Response(JSON.stringify(mockRes), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return originalFetch(...args);
  };
}

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
  const token = localStorage.getItem('admin_token');

  // Prepare headers safely
  const headersObj: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headersObj["Authorization"] = `Bearer ${token}`;
  }

  // Merge with options.headers if they are a simple object
  if (options.headers && typeof options.headers === 'object' && !Array.isArray(options.headers)) {
    Object.assign(headersObj, options.headers);
  }

  // Ensure URL is absolute for localhost development
  const apiUrl = url.startsWith('/api') ? `${url}` : url;

  if (USE_MOCK_API) {
    const mockResponse = resolveMockRequest(apiUrl);
    if (mockResponse !== null) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockResponse;
    }
  }

  console.log("API CALL", apiUrl);

  const res = await fetch(apiUrl, {
    ...options,
    headers: headersObj,
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

      // Prepare headers safely
      const headersObj: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Add Authorization header if token exists
      if (token) {
        headersObj["Authorization"] = `Bearer ${token}`;
      }

      // Ensure URL is absolute for localhost development
      const url = queryKey[0] as string;
      const apiUrl = url.startsWith('/api') ? `${url}` : url;

      if (USE_MOCK_API) {
        const mockResponse = resolveMockRequest(apiUrl);
        if (mockResponse !== null) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));
          return mockResponse;
        }
      }

      const res = await fetch(apiUrl, {
        credentials: "include",
        headers: headersObj
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
