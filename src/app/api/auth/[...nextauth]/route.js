// import connectDB from '@/lib/connectDB';
// import bcrypt from "bcrypt";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//     secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
//     session: {
//         strategy: "jwt",      
//         maxAge: 30 * 24 * 60 * 60,
//       },
//       providers: [
       
//     CredentialsProvider({
//         credentials: {
//           email: {},
//           passwordHash: {},
//         },
//         async authorize(credentials) {
//           const { email, passwordHash } = credentials;
//           if (!email || !passwordHash) {
//             return null;
//           }
  
//           const db = await connectDB();
//           const currentUser = await db.collection("users").findOne({ email });
  
//           if (!currentUser) {
//             return null;
//           }
  
//           const passwordMatched = await bcrypt.compare(
//             passwordHash,
//             currentUser.passwordHash
//           );
//           if (!passwordMatched) {
//             return null;
//           }
  
//           return currentUser;
//         },
//       }),

//         GoogleProvider({
//             clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//             clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
//             authorization: {
//                 params: {
//                   prompt: "consent",
//                   access_type: "offline",
//                   response_type: "code",
                
//                   state: true,
//                 },
//               },
//           }),
//         GitHubProvider({
//             clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
//             clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
//             authorization: {
//                 params: {
//                   scope: "read:user user:email",
//                 },
//               },
//           })
//       ],
//     callbacks: {
//         async jwt({token, account, user}){
//             if(account){
//                 token.role = user.role;
//             }
//             return token
//         },
//         async session ({session, token}){
//             session.user.role = token.role;
//             return session
//         },
//     },

//     async signIn({ user, account }) {
//         console.log("User Info:", user);
//         console.log("Account Info:", account);
//     },    

//     pages: {
//         signIn: "/signin",
//         signUp: "/signup",
//     }
// }

// const handler = NextAuth( authOptions )

// export { handler as GET, handler as POST };


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

        return currentUser;
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
          const defaultRole = "client"; // Set your default role, e.g., "client" or "freelancer"
          const newUser = {
            email: user.email,
            role: defaultRole,
            name: user.name,
            image: user.image,
          };

          // Insert new user into the database
          await db.collection("users").insertOne(newUser);
          user.role = defaultRole;
        } else {
          user.role = existingUser.role; // Use existing role if found
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.role = user.role; // Set role from the user object
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Pass the role to the session object
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
