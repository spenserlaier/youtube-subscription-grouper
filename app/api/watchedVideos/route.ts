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
    userCredentials,
    getSeenVideos,
    markVideoAsSeen,
} from "@/utils/database/database-utils";
import { getUserSubscriptions } from "@/utils/google-api-calls";

export async function GET(request: NextRequest, response: NextResponse) {
    const token = await getToken({ req: request });
    if (token) {
        const userCredentials: userCredentials = {
            googleID: token.userId!,
            email: token.email!,
        };
        const seenVideos = await getSeenVideos(userCredentials);
        console.log("the videos we've seen are: ", seenVideos);

        return Response.json(seenVideos ? seenVideos : []);
    }
    return new Response(null, {
        status: 400,
        statusText: "couldn't authenticate when retrieving watched videos",
    });
}

export async function POST(request: NextRequest, response: NextResponse) {
    const token = await getToken({ req: request });
    if (token) {
        const userCredentials: userCredentials = {
            googleID: token.userId!,
            email: token.email!,
        };
        const body = await request.json();
        const videoId: string = body.videoId;
        const updateSeen = await markVideoAsSeen(userCredentials, videoId);
        if (updateSeen) {
            return new Response(null, {
                status: 200,
            });
        }
    }
    return new Response(null, {
        status: 400,
        statusText: "couldn't authenticate when updating watched videos",
    });
}
