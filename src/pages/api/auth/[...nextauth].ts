// import { NextApiHandler } from 'next';
// import NextAuth, { AuthOptions } from 'next-auth';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
// import prisma from '~/lib/prismadb';

// export const authOptions: AuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   // // secret: process.env.SECRET,
//   // secret: process.env.NEXTAUTH_SECRET,
// };

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
// export default authHandler;

import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '~/lib/prismadb';
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      let isAllowedToSignIn = true
      const allowedUser = [
        'YOURGITHUBACCID',
      ];
      console.log(user);
      if (allowedUser.includes(String(user.id))) {
        isAllowedToSignIn = true
      }
      else {
        isAllowedToSignIn = false
      }
      return isAllowedToSignIn
    }
  }
}

export default NextAuth(authOptions)
