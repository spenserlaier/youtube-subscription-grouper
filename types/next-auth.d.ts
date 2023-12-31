import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    // Extend session to hold the access_token
    interface Session {
        //access_token: string & DefaultSession;
        accessToken?: string;
        refreshToken?: string;
    }
}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        accessToken?: string;
        refreshToken?: string;
    }
}
