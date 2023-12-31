import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const scopes = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "openid",
    "email",
    "profile",
];

export const nextAuthOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.OAUTH_CLIENT_ID!,
            clientSecret: process.env.OAUTH_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: scopes.join(" "),
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            //console.log(`Auth Session = ${JSON.stringify(session)}`);
            //console.log(`Auth Token = ${JSON.stringify(token)}`);
            if (token.accessToken) {
                session.accessToken = token.accessToken; // Put the provider's access token in the session so that we can access it client-side and server-side with `auth()`
                session.refreshToken = token.refreshToken;
            }
            return session;
        },
        jwt({ token, account, profile }) {
            //console.log(`Auth JWT Tok = ${JSON.stringify(token)}`);
            //console.log(`Router Auth JWT account = ${JSON.stringify(account)}`);
            if (account) {
                //console.log("forming jwt from acccount");
                //console.log("access_token:");
                //console.log(account.access_token);
                token.accessToken = account.access_token; // Store the provider's access token in the token so that we can put it in the session in the session callback above
                //console.log("refresh_token:");
                token.refreshToken = account.refresh_token;
            }
            return token;
        },
    },
};
