import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { google } from "googleapis"
import {getAuthClient, setCredentials, getTokenFromCode} from "@/utils/auth-utils"
import { createUserIfNotExists, findUser} from "@/utils/database/database-utils";
import { userIdentification } from "@/utils/youtube/youtube-utils-types";
import jwt from "jsonwebtoken";


export async function GET(req: NextRequest, res: NextResponse) {
    console.log("Attempting to store credentials");
    try{
        /*
         *timestamp checking code
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        if (token.expiry_date > currentTimestamp) {
          console.log('Access token is still valid.');
        } else {
          console.log('Access token has expired. Refresh or re-authenticate.');
        }
        */
        const authClient = getAuthClient();
        const code = req.nextUrl.searchParams.get("code");
        const tokens = await getTokenFromCode(code as string);
        authClient.setCredentials(tokens);
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${authClient.credentials.access_token}`
          }
        });
        console.log("logging user information")
        const userJSON: userIdentification = await userResponse.json();
        console.log(userJSON);
        const createUser = createUserIfNotExists(userJSON.email, userJSON.id);
        //const bobjones: ResponseInit = new NextResponse()
            return new Response('Hello, Next.js!', {
        status: 200,
        headers: { 'Set-Cookie': `token=${token.value}; HttpOnly; SameSite;` },
      })
        //return NextResponse.redirect(new URL('/home', req.url))
)
    }
    catch (error: any){
        console.log("Something went wrong when setting credentials");
        console.log(error);
        redirect("/login");

    }
}
