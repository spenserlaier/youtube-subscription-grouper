import NextAuth, { AuthOptions, TokenSet } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import { nextAuthOptions } from "@/utils/auth-utils";

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
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token; // Store the provider's access token in the token so that we can put it in the session in the session callback above
                token.refreshToken = account.refresh_token;
                token.userId = account.userId;
                token.expiresAt = Math.floor(
                    Date.now() / 1000 + account.expires_at!
                );
                return token;
            } else if (Date.now() < token.expiresAt! * 1000) {
                return token;
            } else {
                try {
                    // https://accounts.google.com/.well-known/openid-configuration
                    // We need the `token_endpoint`.
                    const response = await fetch(
                        "https://oauth2.googleapis.com/token",
                        {
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded",
                            },
                            body: new URLSearchParams({
                                client_id: process.env.OAUTH_CLIENT_ID!,
                                client_secret: process.env.OAUTH_CLIENT_SECRET!,
                                grant_type: "refresh_token",
                                refresh_token: token.refreshToken!,
                            }),
                            method: "POST",
                        }
                    );

                    const tokens: TokenSet = await response.json();
                    //console.log("old token: ", token.accessToken);
                    if (!response.ok) throw tokens;
                    //console.log("token successfully refreshed");
                    return {
                        ...token, // Keep the previous token properties
                        access_token: tokens.access_token,
                        accessToken: tokens.access_token,
                        expires_at: Math.floor(
                            Date.now() / 1000 + tokens.expires_at!
                        ),
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        // TODO: consider storing refresh via database to avoid making prompt
                        // to the user each time
                        refresh_token:
                            tokens.refresh_token ?? token.refreshToken!,
                    };
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    // The error property will be used client-side to handle the refresh token error
                    return {
                        ...token,
                        error: "RefreshAccessTokenError" as const,
                    };
                }
            }
            return token;
        },
    },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
