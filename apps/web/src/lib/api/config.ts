
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
};

if (typeof window !== 'undefined' && !config.apiUrl) {
  console.error("NEXT_PUBLIC_API_URL is not set in environment variables.");
}
