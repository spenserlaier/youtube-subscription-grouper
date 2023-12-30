import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { google } from "googleapis"
import {getAuthClient, setCredentials, getTokenFromCode} from "@/utils/auth-utils"


export async function GET(req: NextRequest, res: NextResponse) {
    console.log("Attempting to store credentials");
    try{
        const authClient = getAuthClient();
        const code = req.nextUrl.searchParams.get("code");
        //console.log(`printing code: ${code}`);
        //if (code == undefined) {
            //throw new Error("undefined code query parameter ");
        //}
        const tokens = await getTokenFromCode(code as string);
        //console.log(`api retrieved the following credentials: ${tokens}`)
        //console.log(tokens)
        authClient.setCredentials(tokens);
        //console.log("credentials have been set");
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${authClient.credentials.access_token}`
          }
        });
        console.log("logging user information")
        const userJSON = await userResponse.json();
        console.log(userJSON);

        return NextResponse.redirect(new URL('/home', req.url))
    }
    catch (error: any){
        console.log("Something went wrong when setting credentials");
        console.log(error);
        redirect("/login");

    }
}
