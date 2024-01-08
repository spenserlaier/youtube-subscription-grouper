"use client";
import { PlaylistVideoResponse, video } from "@/types/youtube-utils-types";
import { useState, useEffect, useRef } from "react";
import VideoCard from "./VideoCard";

type props = {
    channelId: string;
};
const VIDEOS_BATCH_SIZE = 5;

export default function VideoList(props: props) {
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const [fetchNextPage, setFetchNextPage] = useState(true);
    const [videos, setVideos] = useState<video[]>([]);
    const listRef = useRef<HTMLDivElement>(null);
    const [watchedVideos, setWatchedVideos] = useState<string[] | null>(null);
    useEffect(() => {
        let isMounted = true;
        const updateResults = async () => {
            if (watchedVideos === null) {
                const watchedVideosResponse = await fetch("/api/watchedVideos");
                const videos: string[] = await watchedVideosResponse.json();
                setWatchedVideos(videos);
            }
            if (fetchNextPage) {
                const uploadsURL = `/api/uploads/${props.channelId}?pageToken=${nextPageToken}`;
                //const uploadsResponse = await fetch()
                const uploadsResponse = await fetch(uploadsURL, {});
                const uploadsData: PlaylistVideoResponse =
                    await uploadsResponse.json();
                if (uploadsData && isMounted) {
                    setNextPageToken(uploadsData.nextPageToken);
                    const validVideos = watchedVideos
                        ? uploadsData.items.filter(
                              (video) => !watchedVideos.includes(video.id)
                          )
                        : uploadsData.items;
                    //setVideos((videos) => [...videos, ...uploadsData.items]);
                    setVideos((videos) => [...videos, ...validVideos]);
                    if (
                        videos.length >= VIDEOS_BATCH_SIZE ||
                        nextPageToken === undefined
                    ) {
                        setFetchNextPage(false);
                    }
                }
            }
        };
        updateResults();
        return () => {
            isMounted = false;
        };
    });
    const videoComponents = videos.map((v) => {
        //if (watchedVideos && !watchedVideos.includes(v.id)) {
        return <VideoCard {...v} key={v.id} />;
        //}
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
