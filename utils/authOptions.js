import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // this object is passed to next auth, and if you were to have more authentication options (github, facebook, etc) you would add them to this providers array with your IDs and secrets for them
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
      // This section prevents nextauth from automatically logging in the last google account used
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. connect to the database
      // 2. check if user exists
      // 3. if not then create user
      // 4. else, return true to allow sign in
    },
    // session callback function that modifies the session object
    async session({ sess }) {
      // 1. get user from database
      // 2. assign user id from the session
      // 3. return session
    },
  },
};
