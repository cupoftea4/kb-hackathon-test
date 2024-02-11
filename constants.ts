if (!process.env.API_URL) {
  throw new Error('Missing API_URL');
}

export const API_URL = process.env.API_URL;

if(!process.env.GOOGLE_OAUTH_CLIENT_ID || !process.env.GOOGLE_OAUTH_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET');
}

export const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
export const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET');
}

// It is important to match the secret on the server
export const JWT_SECRET = process.env.JWT_SECRET;


