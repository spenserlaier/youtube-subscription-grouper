"use client";
import { useDrag, useDrop } from "react-dnd";

type props = {
    subscriptionName: string;
};

type collected = {
    isDragging: boolean;
};
const ItemType = "SubscriptionCard";
export default function SubscriptionCard(props: props) {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: ItemType,
        item: { subscriptionName: props.subscriptionName },
        end: (item, monitor) => {
            if (!monitor.didDrop()) {
                // The item was not dropped onto a valid target
                console.log("Drag ended, but not dropped onto a valid target");
                // Perform actions or cleanup for unsuccessful drop
            } else {
                console.log("Drag ended on a successful drop target");
            }
        },
    }));

    return (collected as collected).isDragging ? (
        <h1 ref={dragPreview}>drag preview here</h1>
    ) : (
        <h1 ref={drag} {...(collected as collected)}>
            {props.subscriptionName}
        </h1>
    );
}
