"use client";
import { playlistItem, video } from "@/types/youtube-utils-types";
import { userCredentials } from "@/utils/database/database-utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VideoCard(props: playlistItem) {
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
        <div className="border m-2 align-middle text-center rounded-xl flex p-2 max-h-20">
            <button onClick={handleHideVideoClick}> Hide This Video</button>
        </div>
    );
    if (hideVideoButtonClicked) {
        hideVideoButton = <div> You Won&apos;t See This Video Again</div>;
    }
    console.log("logging props from video card...", props);
    return (
        <>
            <div className="flex flex-row border p-2 rounded-xl m-2 w-3/4 justify-between items-center">
                <Link href={`/videos/${props.contentDetails.videoId}`}>
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-l">{props.snippet.title}</h2>
                        <Image
                            //src={props.snippet.thumbnails["default"].url}
                            src={props.snippet.thumbnails["standard"].url}
                            //width={640}
                            width={200}
                            height={0}
                            //height={480}
                            alt="video thumbnail"
                            className=" h-auto rounded-xl"
                        ></Image>
                    </div>
                </Link>
                {hideVideoButton}
            </div>
        </>
    );
}
