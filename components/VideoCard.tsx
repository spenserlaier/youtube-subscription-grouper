"use client";
import { video } from "@/types/youtube-utils-types";
import { userCredentials } from "@/utils/database/database-utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VideoCard(props: video) {
    const [databaseUpdated, setDatabaseUpdated] = useState(false);
    const [hideVideoButtonClicked, setHideVideoButtonClicked] = useState(false);
    useEffect(() => {
        const markAsSeenInDatabase = async () => {
            console.log("receved the id: ", props.id);
            if (hideVideoButtonClicked && !databaseUpdated) {
                console.log("about to make db watchedvideos request...");
                const result = await fetch("/api/watchedVideos", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ videoId: props.id }),
                });
                console.log("making db request...");
                if (result) {
                    console.log("valid result. setting database");
                    setDatabaseUpdated(true);
                } else {
                    console.log("unable to update");
                }
            }
        };
        markAsSeenInDatabase();
    });

    const handleHideVideoClick = () => {
        setHideVideoButtonClicked(true);
    };
    let hideVideoButton = (
        <div className="border m-2 align-middle text-center rounded-xl flex p-2">
            <button onClick={handleHideVideoClick}> Hide This Video</button>
        </div>
    );
    if (hideVideoButtonClicked) {
        hideVideoButton = <div> You Won&apos;t See This Video Again</div>;
    }
    return (
        <>
            <div className="flex flex-row border p-2 rounded-xl m-2">
                <Link href={`/videos/${props.id}`}>
                    <h2>{props.snippet.title}</h2>
                    <Image
                        src={props.snippet.thumbnails["default"].url}
                        width={88}
                        height={88}
                        alt="video thumbnail"
                    ></Image>
                </Link>
                {hideVideoButton}
            </div>
        </>
    );
}
