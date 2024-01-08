"use client";
import { useDrag, useDrop } from "react-dnd";
//import { draggableSubscription } from "@/types/draggable";
import { draggableSubscription } from "@/types/youtube-utils-types";
import { subscription } from "@/types/youtube-utils-types";
import Image from "next/image";

type collected = {
    isDragging: boolean;
};
/*
type props = subscription & {
    deletionCallback? : 
};
 */
const ItemType = "SubscriptionCard";
export default function SubscriptionCard(props: subscription) {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: ItemType,
        item: props,
        end: (item, monitor) => {
            if (!monitor.didDrop()) {
                // The item was not dropped onto a valid target
                //console.log("Drag ended, but not dropped onto a valid target");
                // Perform actions or cleanup for unsuccessful drop
            } else {
                //console.log("Drag ended on a successful drop target");
            }
        },
    }));

    return (collected as collected).isDragging ? (
        <h1 ref={dragPreview}>drag preview here</h1>
    ) : (
        <div
            ref={drag}
            {...(collected as collected)}
            className="flex justify-center p-4"
        >
            <h1>{props.snippet.title}</h1>
            <Image
                src={props.snippet.thumbnails["default"].url}
                height={30}
                width={30}
                alt="subscription thumbnail"
                className="rounded-lg"
            />
        </div>
    );
}
