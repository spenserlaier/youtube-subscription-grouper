"use client";
import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import YouTube, { YouTubeProps } from "react-youtube";

export default function viewVideo({ params }: { params: { videoId: string } }) {
    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };
    const opts: YouTubeProps["opts"] = {
        height: "390",
        width: "640",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    return (
        <>
            <div>
                video id found: {params.videoId}
                <YouTube
                    videoId={params.videoId}
                    opts={opts}
                    onReady={onPlayerReady}
                />
            </div>
        </>
    );
}
