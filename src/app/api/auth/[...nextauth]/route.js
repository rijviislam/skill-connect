import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from '@/lib/connectDB';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: "jwt",      
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
      providers: [
        CredentialsProvider({
            credentials: {
                email : { },
                password : { }
            },

            async authorize(credentials) {
                const { email, password } = credentials;

                if(!credentials){
                    return null
                }
                
                if(email){
                    const db =await connectDB()
                    const currentUser = await db.collection("users").findOne({email: email})
                    console.log(currentUser)

                    if(currentUser){

                        if(currentUser && currentUser.password === password){
                            return currentUser;
                        }
                    }
                }
                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
          }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
          })
      ],
    callbacks: {
        async jwt({token, account, user}){
            if(account){
                token.type = user.type
            }
            return token
        },
        async session ({session, token}){
            session.user.type = token.type
            return session
        },
    },
    pages: {
        signIn: "/signin",
        signUp: "/signup",
    }
}

const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }