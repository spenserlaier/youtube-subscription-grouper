import { channel, playlistItem, video } from "@/types/youtube-utils-types";

export async function getChannelDataById(
    channelId: string,
    accessToken: string
) {
    const channelResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${accessToken}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }

        //`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=${token.accessToken}`
    );
    if (channelResponse.status === 200) {
        const channelResponseData = await channelResponse.json();
        const channel: channel = channelResponseData.items[0];
        return channel;
    }
    console.error(
        "something went wrong when retrieving channel data (utils/googleapicalls/getchanneldatabyId)"
    );
    return null;
}

export async function getVideosByPlaylistId(
    playlistId: string,
    accessToken: string,
    pageToken: string | null = null
) {
    console.log("getting videos by playlist id...");
    let fetchURL = "";
    if (pageToken && pageToken != "null") {
        fetchURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&key=${accessToken}&pageToken=${pageToken}`;
    } else {
        fetchURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&key=${accessToken}`;
    }
    const playlistVideosResponse = await fetch(fetchURL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    if (playlistVideosResponse.status === 200) {
        const playlistData = await playlistVideosResponse.json();
        //const playlistItems: playlistItem[] = playlistData.items;
        //return playlistItems;
        return playlistData;
    }
    console.error(
        "something went wrong when retrieving playlist data (utils/googleapicalls/getplaylistbyid)"
    );
    return null;
}
export async function getVideoById(videoId: string, accessToken: string) {
    const videoResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${accessToken}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );
    if (videoResponse.status === 200) {
        const videoData = await videoResponse.json();
        const video: video = videoData.items[0];
        return video;
    }
    console.error(
        "something went wrong when retrieving video data (utils/googleapicalls/getvideobyid)"
    );
    return null;
}

export async function getUserSubscriptions(
    pageToken: string | null = null,
    accessToken: string,
    maxResults = 50
) {
    let fetchURL = "";
    if (pageToken == null || pageToken === "null") {
        fetchURL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}`;
    } else {
        console.log("proceeding with the following page token: ", pageToken);
        fetchURL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}&pageToken=${pageToken}`;
    }

    const subscriptionResponse = await fetch(fetchURL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    if (subscriptionResponse.status == 200) {
        const subscriptionData = await subscriptionResponse.json();
        console.log("successfully retrieved subscriptions...");
        return subscriptionData;
    }
    console.error(
        "error when retrieving user subscriptions (source: utils/googleapicalls/getusersubscriptions)",
        subscriptionResponse.statusText
    );
    const json = await subscriptionResponse.json();
    console.log("logging error from usersubscriptions: ", json);
    return null;
}
