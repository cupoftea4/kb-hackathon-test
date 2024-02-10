import GoogleProvider from 'next-auth/providers/google';
import { CLIENT_ID, CLIENT_SECRET } from '@/constants';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextApiHandler } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { signJwt } from '@/lib/jwt';
import { JwtPayload } from '@/types/general';
import { cookies } from 'next/headers';

export const OPTIONS: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise) as AuthOptions['adapter'],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: { 
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id;
        const jwt = await signJwt({
          sub: token.sub,
          expires_at: account.expires_at,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          },
        } satisfies JwtPayload);
        token.accessToken = jwt;
        cookies().set('auth_token', jwt);
      }
      return token;
    },
    async session({ session, token, user }) {
      session = { ...session, ...token, ...user };
      return session
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, OPTIONS);

export { authHandler as GET, authHandler as POST };
