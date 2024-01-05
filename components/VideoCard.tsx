import { video } from "@/types/youtube-utils-types";
import Image from "next/image";
import Link from "next/link";

export default function VideoCard(props: video) {
    return (
        <>
            <div>
                <Link href={`/videos/${props.id}`}>
                    <h2>{props.snippet.title}</h2>
                    <Image
                        src={props.snippet.thumbnails["default"].url}
                        width={88}
                        alt="video thumbnail"
                        height={88}
                    ></Image>
                </Link>
            </div>
        </>
    );
}
