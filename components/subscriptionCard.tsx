"use client";
import { useDrag, useDrop } from "react-dnd";
//import { draggableSubscription } from "@/types/draggable";
import { draggableSubscription } from "@/types/youtube-utils-types";
import { subscription } from "@/types/youtube-utils-types";

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
        <h1 ref={drag} {...(collected as collected)}>
            {props.snippet.title}
        </h1>
    );
}
