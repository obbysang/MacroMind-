import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchClient } from '@/lib/api/client';

// Mock config
vi.mock('@/lib/api/config', () => ({
  config: {
    apiUrl: 'http://localhost:8000/api/v1',
  },
}));

describe('fetchClient', () => {
  const originalLocation = window.location;
  const mockLocation = { href: '', pathname: '/dashboard' };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
    
    // Mock window.location
    delete (window as any).location;
    window.location = mockLocation as any;
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('redirects to login on 403 "Could not validate credentials"', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      json: async () => ({ detail: 'Could not validate credentials' }),
    });

    await expect(fetchClient('/test')).rejects.toThrow('Could not validate credentials');
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(window.location.href).toBe('/login');
  });

  it('does not redirect on other 403 errors', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      json: async () => ({ detail: 'Not enough permissions' }),
    });

    await expect(fetchClient('/test')).rejects.toThrow('Not enough permissions');
    
    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });

  it('redirects to login on 401', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({ detail: 'Not authenticated' }),
    });

    await expect(fetchClient('/test')).rejects.toThrow('Not authenticated');
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(window.location.href).toBe('/login');
  });
});
