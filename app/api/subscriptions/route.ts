import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionResponse } from "@/types/youtube-utils-types";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/utils/auth-utils";
import {
    addSubscriptionGroup,
    user,
    subscriptionGroup,
    createUserIfNotExists,
} from "@/utils/database/database-utils";
import { getUserSubscriptions } from "@/utils/google-api-calls";

//for testing purposes: channel id here UCVY-2RcKZzDjbaWO3jqcRDA
export async function GET(request: NextRequest, response: NextResponse) {
    const token = await getToken({ req: request });
    try {
        const pageToken = request.nextUrl.searchParams.get("pageToken");
        //TODO: get rid of undefined, just make the function accept null or string valued pagetokens below
        console.log("logging pagetoken from api query parameters", pageToken);
        const subscriptionData = await getUserSubscriptions(
            pageToken,
            token!.accessToken!,
            50
        );
        return Response.json(subscriptionData);
    } catch (error) {
        console.log("error with utils google api call...", error);
        return new Response(null, {
            status: 500,
        });
    }
}

/*
 * takes the user's token and a subscriptiongroup object and updates
 * that user's database document
 */

//type addRequestBody = {
//body: { subscriptionGroup: subscriptionGroup };
//};
export async function POST(request: NextRequest, response: NextResponse) {
    const token = await getToken({ req: request });
    console.log("entering function");
    const subscriptionGroup: subscriptionGroup = await request.json();
    //const subscriptionGroup = requestJSON.body;

    if (token) {
        if (!token.userId) {
            console.log("token is undefined. why?");
        }
        const user: user = {
            email: token.email!,
            googleID: token.userId!,
            subscriptionGroups: [],
        };
        const dbUser = createUserIfNotExists(user);
        const userEmail = token.email!;
        try {
            //const user = await
            const result = await addSubscriptionGroup(user, subscriptionGroup);
            console.log("succesfully created group");
            return new Response(null, {
                status: 200,
            });
        } catch (error) {
            console.error("Error when adding subscriptionGroup: ", error);
            return new Response(null, {
                status: 500,
            });
        }
    }
}
