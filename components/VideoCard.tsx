"use client";
import { video } from "@/types/youtube-utils-types";
import { userCredentials } from "@/utils/database/database-utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type props = video & userCredentials;
export default function VideoCard(props: props) {
    const [databaseUpdated, setDatabaseUpdated] = useState(false);
    const [hideVideoButtonClicked, setHideVideoButtonClicked] = useState(false);
    useEffect(() => {
        const markAsSeenInDatabase = async () => {
            if (hideVideoButtonClicked && !databaseUpdated) {
                const userCredentials: userCredentials = {
                    email: props.email,
                    googleID: props.googleID,
                };

                const result = await fetch("/api/watchedVideos", {
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
        <button onClick={handleHideVideoClick}>
            {" "}
            click here to hide this video in the future
        </button>
    );
    if (hideVideoButtonClicked) {
        hideVideoButton = <div> you won&apos;t see this video again</div>;
    }
    return (
        <>
            <div className="flex flex-row">
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
