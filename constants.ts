export const API_URL = "http://localhost:5005";
// if (!process.env.NX_PRODUCT_ID) {
//   throw new Error('Missing NX_PRODUCT_ID');
// }

if(!process.env.GOOGLE_OAUTH_CLIENT_ID || !process.env.GOOGLE_OAUTH_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET');
}

export const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID ;
export const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

// if(!process.env.MONGODB_NAME) {
//   throw new Error('Missing MONGODB_NAME');
// }

// export const MONGODB_NAME = process.env.MONGODB_NAME;
