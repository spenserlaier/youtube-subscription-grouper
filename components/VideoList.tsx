"use client";
import { PlaylistVideoResponse, video } from "@/types/youtube-utils-types";
import { useState, useEffect, useRef } from "react";
import VideoCard from "./VideoCard";

type props = {
    channelId: string;
};

export default function VideoList(props: props) {
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const [fetchNextPage, setFetchNextPage] = useState(true);
    const [videos, setVideos] = useState<video[]>([]);
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let isMounted = true;
        const updateResults = async () => {
            if (fetchNextPage) {
                const uploadsURL = `/api/uploads/${props.channelId}?pageToken=${nextPageToken}`;
                //const uploadsResponse = await fetch()
                const uploadsResponse = await fetch(uploadsURL);
                const uploadsData: PlaylistVideoResponse =
                    await uploadsResponse.json();
                if (isMounted) {
                    //TODO: why does the check for isMounted work here, but not
                    //when placed with fetchNextPage, i.e. "if (isMounted && fetchNextPage)"? the latter
                    //still causes duplicate renders
                    setNextPageToken(uploadsData.nextPageToken);
                    setVideos((videos) => [...videos, ...uploadsData.items]);
                }
            }
            setFetchNextPage(false);
        };
        updateResults();
        return () => {
            isMounted = false;
        };
    });
    const videoComponents = videos.map((v) => {
        return <VideoCard {...v} key={v.id} />;
    });

    useEffect(() => {
        const handleScroll = () => {
            const listContainer = listRef.current;
            if (listContainer) {
                const scrollPosition =
                    listContainer.scrollTop + listContainer.clientHeight;
                const totalHeight = listContainer.scrollHeight;

                // Check if the user has reached the bottom (or near the bottom with some threshold)
                if (scrollPosition >= totalHeight - 20) {
                    console.log("Reached the bottom!");
                    // Do something when the user reaches the bottom
                    setFetchNextPage(true);
                }
            }
        };
        const container = listRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);

            return () => {
                // Clean up the event listener when the component unmounts
                container.removeEventListener("scroll", handleScroll);
            };
        }
    });

    return (
        <>
            <div ref={listRef} className="max-h-64 max-w-64 overflow-auto">
                <div>this is a placeholder for the video list component</div>
                <div>{videoComponents}</div>
            </div>
        </>
    );
}
