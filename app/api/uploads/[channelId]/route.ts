import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
    channel,
    playlistItem,
    subscriptionResponse,
    video,
} from "@/types/youtube-utils-types";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/utils/auth-utils";
import {
    addSubscriptionGroup,
    user,
    subscriptionGroup,
    createUserIfNotExists,
} from "@/utils/database/database-utils";
import {
    getChannelDataById,
    getVideosByPlaylistId,
    getVideoById,
} from "@/utils/google-api-calls";

// test channel id: UCVY-2RcKZzDjbaWO3jqcRDA

export async function GET(
    request: NextRequest,
    { params }: { params: { channelId: string } }
) {
    const token = await getToken({ req: request });
    if (token) {
        const user: user = {
            email: token.email!,
            googleID: token.userId!,
            subscriptionGroups: [],
        };
        const channel = await getChannelDataById(
            params.channelId,
            token.accessToken!
        );
        const uploadsPlaylistId =
            channel!.contentDetails.relatedPlaylists.uploads;
        const playlistVideos = await getVideosByPlaylistId(
            uploadsPlaylistId,
            token.accessToken!
        );
        console.log("retrieved playlist videos...", playlistVideos);
        return Response.json(playlistVideos);
        /*
        let gotVideo = false;
        for (const item of playlistVideos!) {
            if (item.contentDetails) {
                const videoId = item.contentDetails.videoId; // the id of the video. which can then be accessed via
                if (!gotVideo) {
                    console.log("about to retrieve video here");
                    const video = await getVideoById(
                        videoId,
                        token.accessToken!
                    );
                    console.log("logging the video...");
                    console.log("video data: ", video);
                    gotVideo = true;
                }
            }
        }
        */
    } else {
        console.log("no token, couldn't receive playlist videos");
    }
}

export async function POST(request: NextRequest, response: NextResponse) {}
