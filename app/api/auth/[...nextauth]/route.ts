import GoogleProvider from 'next-auth/providers/google';
import { CLIENT_ID, CLIENT_SECRET } from '@/constants';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextApiHandler } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import clientPromise from '@/lib/mongodb';

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
        token.accessToken = account.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log('session', session, token, user);
      session = { ...session, ...token, ...user };
      console.log('updated session', session);
      return session
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, OPTIONS);

export { authHandler as GET, authHandler as POST };
