import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  // this object is passed to next auth, and if you were to have more authentication options (github, facebook, etc) you would add them to this providers array with your IDs and secrets for them
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    // Invoked on successful sign in, when running the signIn function from nextjs
    async signIn({ profile }) {
      // 1. connect to the database
      await connectDB();
      // 2. check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. if not then create user
      if (!userExists) {
        // truncate username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow sign in
      return true;
    },
    // session callback function that modifies the session object (getSession triggers this I think)
    async session({ session }) {
      // 1. get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. assign user id from the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
