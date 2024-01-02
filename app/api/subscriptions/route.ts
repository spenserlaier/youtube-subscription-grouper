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

export async function GET(request: NextRequest, response: NextResponse) {
    const sessionAttempt = await getServerSession(nextAuthOptions);
    /*
    console.log(
        "logging session retrieval attempt from subscription api: ",
        sessionAttempt,
        new Date()
    );
    */
    const token = await getToken({ req: request });
    if (token) {
        console.log("token received.");
        console.log(`access token:  ${token.accessToken}`);
        console.log(`refresh token:  ${token.refreshToken}`);
        console.log(`expiration date in seconds: ${token.expiresAt}`);
    }

    try {
        let fetchURL = "";
        let maxResults = "50"; //it seems the max results per page is 50, even if we set it higher
        const currentURL = request.url;
        const urlParams = new URLSearchParams(currentURL);
        const pageToken = request.nextUrl.searchParams.get("pageToken");
        //const pageToken = request.query.pageToken;
        if (pageToken == null) {
            fetchURL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}`;
        } else {
            fetchURL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}&pageToken=${pageToken}`;
        }
        let accessToken = null;
        if (token) {
            accessToken = token.accessToken;
        }
        const subscriptionResponse = await fetch(fetchURL, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        });
        if (!subscriptionResponse.ok) {
            console.error("Something went wrong when requesting subscriptions");
            //console.error(subscriptionResponse);
            return new Response(null, {
                status: 400,
            });
        }
        const subscriptionData: subscriptionResponse =
            await subscriptionResponse.json();
        return Response.json(subscriptionData);
    } catch (error) {
        console.error(
            "Internal Error when fetching subscribed channels:",
            error
        );
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

    console.log("made json");

    if (token) {
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
