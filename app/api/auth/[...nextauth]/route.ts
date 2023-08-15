import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          return
        }
      }),

    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID??"",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET??"",
  pages: {
    signIn: '/login',
  },
}

const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST}