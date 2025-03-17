import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToMongoClient } from "@/lib/mongodb";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(connectToMongoClient()),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const db = (await connectToMongoClient()).db("memory_cards");
      await db.collection("users").updateOne(
        { email: user.email },
        { $set: { lastLoggedIn: new Date() } },
        { upsert: true }
      );
      return true;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-email",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
