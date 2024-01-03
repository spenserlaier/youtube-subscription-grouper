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
        console.log("logging contendetails", channel.contentDetails);
        const uploadsPlaylistId =
            channel.contentDetails.relatedPlaylists.uploads;
        const playlistVideosResponse = await fetch(
            `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${token.accessToken}`,
            {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    Accept: "application/json",
                },
            }
        );
        const playlistVideosData = await playlistVideosResponse.json();
        console.log(
            "logging data retrieved via uploads playlist id: ",
            playlistVideosData
        );
        //console.log(playlistVideosData);
        const playlistVideos: playlistItem[] = playlistVideosData.items;
        let gotVideo = false;
        for (const item of playlistVideos) {
            //console.log("uploaded video snippet: ", item.snippet);
            if (item.contentDetails) {
                const videoId = item.contentDetails.videoId; // the id of the video. which can then be accessed via
                // a video query to the api
                //console.log(item.snippet);
                if (!gotVideo) {
                    const videoResponse = await fetch(
                        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${token.accessToken}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token.accessToken}`,
                                Accept: "application/json",
                            },
                        }
                    );
                    const videoData = await videoResponse.json();
                    const singleVideo: video = videoData.items[0];
                    console.log("video data: ", videoData);
                    console.log("single video json: ", singleVideo);
                    gotVideo = true;
                }
            }
        }
        //  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]' \
    }
}

export async function POST(request: NextRequest, response: NextResponse) {}
