
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
    if (response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        // We can't use router here easily, but we can clear token
        if (typeof window !== 'undefined') {
            // localStorage.removeItem('token');
            // window.location.href = '/login';
        }
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
