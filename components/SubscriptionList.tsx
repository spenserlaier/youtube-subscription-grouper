"use client";
import { useDrag, useDrop } from "react-dnd";
import { useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { draggableCard } from "@/types/draggable";

type props = {
    //subscriptionName: string;
};

type collected = {
    isDragging: boolean;
};
const acceptedItems = "SubscriptionCard";
export default function SubscriptionList(props: props) {
    const [currentSubscriptions, setCurrentSubscriptions] = useState<any>([]);
    const [collectedProps, drop] = useDrop(() => ({
        accept: [acceptedItems],
        collect: (monitor) => {
            const item = monitor.getItem();
            console.log(item);
        },
        drop: (item, monitor) => {
            // Behavior when the item is dropped
            console.log("Item dropped:", item);
            //onDrop(item); // Call a custom function with the dropped item
            setCurrentSubscriptions((currentSubscriptions: string[]) => {
                if (
                    !currentSubscriptions.includes(
                        (item as draggableCard).subscriptionName
                    )
                ) {
                    return [
                        ...currentSubscriptions,
                        (item as draggableCard).subscriptionName,
                    ];
                } else {
                    return currentSubscriptions;
                }
            });
        },
    }));
    const subscriptionComponents = currentSubscriptions.map(
        (subName: string) => {
            return (
                <SubscriptionCard subscriptionName={subName} key={subName} />
            );
        }
    );
    return (
        <>
            <div className="text-3xl" ref={drop}>
                Drop Target
            </div>
            {subscriptionComponents}
        </>
    );
}
