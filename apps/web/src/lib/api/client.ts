
import { config } from './config';

export async function fetchClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!config.apiUrl) {
    throw new Error("API configuration is missing. Please set NEXT_PUBLIC_API_URL.");
  }

  const url = `${config.apiUrl}${endpoint}`;
  
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // Only set Content-Type to application/json if it's not FormData and not already set
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // Add Authorization header if token exists
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Handle auth errors
    if (response.status === 401 || (response.status === 403 && errorData.detail === "Could not validate credentials")) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            // Only redirect if we are not already on the login page to avoid loops
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
    }
    
    throw new Error(errorData.detail || errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
