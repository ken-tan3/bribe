import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "utils/prisma";

export default NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    // old
    // how to return userId by getSession()
    // https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1863534
    // new (current version)
    // Where and how to change session user object after signing in?
    // https://stackoverflow.com/questions/64576733/where-and-how-to-change-session-user-object-after-signing-in
    session: async ({ session, token }) => {
      if (session?.user) {
        // get user info from token
        const userInfo = token.user;
        // clear default session.user
        session.user = {};
        // only returns this array element
        const returnUserInfo = ["id", "nickName", "emoji", "countryId"];
        returnUserInfo.map(
          (element) => (session.user[element] = userInfo[element])
        );
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
