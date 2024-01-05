"use client";
import { video } from "@/types/youtube-utils-types";
import { useState, useEffect, useRef } from "react";

export default function VideoList() {
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const [fetchNextPage, setFetchNextPage] = useState(true);
    const [videos, setVideos] = useState<video[]>([]);
    useEffect(() => {
        if (fetchNextPage) {
            //const videoResponse = await fetch("/api/uploads",)
        }
    });

    return (
        <>
            <div>this is a placeholder for the video list component</div>
        </>
    );
}
