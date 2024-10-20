// utils/cors.js
export function setCorsHeaders(res: { setHeader: (arg0: string, arg1: string) => void; }) {
    res.setHeader('Access-Control-Allow-Origin', 'https://your-vercel-domain.vercel.app'); // Replace with your actual Vercel URL
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  