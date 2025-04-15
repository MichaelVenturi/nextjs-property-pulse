import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

// now, when a GET or POST request is made to api/auth/... it will trigger the handler
export { handler as GET, handler as POST };
