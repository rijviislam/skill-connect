import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from '@/lib/connectDB';

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: "jwt",      
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
      providers: [
        CredentialsProvider({
            credentials: {
                email : { label: "Email", type: "text", placeholder: "Your Email", require: true },
                password : { label: "Password", type: "password", placeholder: "Your Password", require: true }
            },

            async authorize(credentials) {
                const { email, password } = credentials;

                if(!credentials){
                    return null
                }
                
                if(email){
                    const db =await connectDB()
                    const currentUser = await db.collection("users").findOne({email})
                    console.log(currentUser)

                    if(currentUser){

                        if(currentUser.password === password){
                            return currentUser;
                        }
                    }
                }
                return null
            }
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
        }
    }
}

const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }