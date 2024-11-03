import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        passwordHash: {},
      },
      async authorize(credentials) {
        const { email, passwordHash } = credentials;
        if (!email || !passwordHash) return null;

        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) return null;

        const passwordMatched = await bcrypt.compare(
          passwordHash,
          currentUser.passwordHash
        );
        if (!passwordMatched) return null;

      
        return {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name, 
          role: currentUser.role, 
          image: currentUser.image, 
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          state: true,
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const db = await connectDB();
        const existingUser = await db.collection("users").findOne({ email: user.email });

        if (!existingUser) {
          const defaultRole = "client"; 
          const newUser = {
            email: user.email,
            role: defaultRole,
            name: user.name,
            image: user.image,
          };

      
          await db.collection("users").insertOne(newUser);
          user.role = defaultRole;
        } else {
          user.role = existingUser.role;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        
        token.id = user.id; 
        token.email = user.email; 
        token.name = user.name; 
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; 
      session.user.email = token.email;
      session.user.name = token.name; 
      session.user.role = token.role; 
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
