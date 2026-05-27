import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getApiBaseUrl } from './api';

describe('getApiBaseUrl', () => {
  const originalEnv = import.meta.env;
  const originalWindow = global.window;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    import.meta.env = originalEnv;
    global.window = originalWindow;
  });

  it('returns VITE_API_BASE_URL if set', () => {
    import.meta.env = { ...originalEnv, VITE_API_BASE_URL: 'https://api.example.com' };
    expect(getApiBaseUrl()).toBe('https://api.example.com');
  });

  it('returns VITE_API_URL if set and VITE_API_BASE_URL is not', () => {
    import.meta.env = { ...originalEnv, VITE_API_URL: 'https://api.example2.com' };
    expect(getApiBaseUrl()).toBe('https://api.example2.com');
  });

  it('returns localhost if no env vars set and hostname is localhost', () => {
    import.meta.env = { ...originalEnv, VITE_API_BASE_URL: undefined, VITE_API_URL: undefined };
    global.window = { location: { hostname: 'localhost' } } as any;
    expect(getApiBaseUrl()).toBe('http://localhost:3001');
  });

  it('throws error if no env vars set and hostname is not localhost (preview env)', () => {
    import.meta.env = { ...originalEnv, VITE_API_BASE_URL: undefined, VITE_API_URL: undefined };
    global.window = { location: { hostname: 'stellar-yield-preview.vercel.app' } } as any;
    expect(() => getApiBaseUrl()).toThrow('API_UNAVAILABLE: Backend URL not configured for preview environment. Please set VITE_API_BASE_URL.');
  });
});
