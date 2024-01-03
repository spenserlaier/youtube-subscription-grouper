import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { channel, subscriptionResponse } from "@/types/youtube-utils-types";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/utils/auth-utils";
import {
    addSubscriptionGroup,
    user,
    subscriptionGroup,
    createUserIfNotExists,
} from "@/utils/database/database-utils";

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
        const channelResponse = await fetch(
            //`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${token.accessToken}`,
            //`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=${token.acessToken}`,
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${params.channelId}&key=${token.accessToken}`,
            {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    Accept: "application/json",
                },
            }

            //`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=${token.accessToken}`
        );
        const channelData = await channelResponse.json();
        // UCHH-ybUwH1CfJrXxnqw6Ljw

        console.log("printing the playlist data...", channelData);
        const channel: channel = channelData.items[0];
        console.log("logging snippet", channel.contentDetails);
        const uploadsPlaylist = channel.contentDetails.relatedPlaylists.uploads;
    }
}

export async function POST(request: NextRequest, response: NextResponse) {}
