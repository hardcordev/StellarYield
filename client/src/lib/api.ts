export function getApiBaseUrl(): string {
  const url = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
  if (url) {
    return url;
  }

  const isLocalhost = typeof window !== 'undefined' 
    ? window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    : true;

  if (!isLocalhost) {
    throw new Error("API_UNAVAILABLE: Backend URL not configured for preview environment. Please set VITE_API_BASE_URL.");
  }

  return "http://localhost:3001";
}
