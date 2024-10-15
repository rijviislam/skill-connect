import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from '@/lib/connectDB';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: "jwt",      
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
      providers: [
        // CredentialsProvider({
        //     credentials: {
        //         email : { },
        //         password : { }
        //     },

        //     async authorize(credentials) {
        //         const { email, password } = credentials;

        //         if(!credentials){
        //             return null
        //         }
                
        //         if(email){
        //             const db =await connectDB()
        //             const currentUser = await db.collection("users").findOne({email: email})
        //             console.log(currentUser)

        //             if(currentUser){

        //                 if(currentUser && currentUser.password === password){
        //                     return currentUser;
        //                 }
        //             }
        //         }
        //         return null
        //     }
        // }),
        
         // Credentials provider
    CredentialsProvider({
        credentials: {
          email: {},
          passwordHash: {},
        },
        async authorize(credentials) {
          const { email, passwordHash } = credentials;
          if (!email || !passwordHash) {
            return null;
          }
  
          const db = await connectDB();
          const currentUser = await db.collection("users").findOne({ email });
  
          if (!currentUser) {
            return null;
          }
  
          // Compare passwords (async version)
          const passwordMatched = await bcrypt.compare(
            passwordHash,
            currentUser.passwordHash
          );
          if (!passwordMatched) {
            return null;
          }
  
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
          })
      ],
    callbacks: {
        async jwt({token, account, user}){
            if(account){
                token.role = user.role;
            }
            return token
        },
        async session ({session, token}){
            session.user.role = token.role;
            return session
        },
    },

    async signIn({ user, account }) {
        console.log("User Info:", user);
        console.log("Account Info:", account);
    
        // if (account.provider === "google" || account.provider === "github") {
        //     const { name, email, image } = user;
    
        //     try {
        //         const db = await connectDB();
        //         const userCollection = db.collection("users");
        //         const userExist = await userCollection.findOne({ email });
    
        //         if (!userExist) {
        //             const newUser = { name, email, image };
        //             const result = await userCollection.insertOne(newUser);
        //             console.log("User Created:", result);
        //         } else {
        //             console.log("User already exists:", userExist);
        //         }
        //         return user; // Return the user object
        //     } catch (error) {
        //         console.error("Error during signIn:", error);
        //         return null; // Return null to indicate failure
        //     }
        // } else {
        //     return user; // Return user for credentials provider
        // }
    },    

    pages: {
        signIn: "/signin",
        signUp: "/signup",
    }
}

const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }