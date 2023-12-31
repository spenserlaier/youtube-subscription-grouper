import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { nextAuthOptions } from "@/utils/auth-utils";

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
